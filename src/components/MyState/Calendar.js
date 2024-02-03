import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import {
    AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Box, Button,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {deleteStemp, getStemp} from "../../hooks/stempHook";
import React from "react";

export default function Calendar(props) {
    const [events, setEvents] = useState([]);
    const userID = localStorage.getItem("user_uid");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [deleteDate, setDeleteDate] = useState(null);
    const toast = useToast();
    let excellentNum = 0;
    let goodNum = 0;
    let m_excellentNum = 0;
    let m_goodNum = 0;

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const stemp = await getStemp(userID);
        const events = stemp.map((item) => {
            if(item.quest_status === "excellent") {
                excellentNum++;
                if(item.quest_date.substring(0, 7) === new Date().toISOString().substring(0, 7)) {
                    m_excellentNum++;
                }
            }else if(item.quest_status === "good") {
                goodNum++;
                if(item.quest_date.substring(0, 7) === new Date().toISOString().substring(0, 7)) {
                    m_goodNum++;
                }
            }


            return {
                start: item.quest_date,
                display: "background",
                name: item.user_name,
                backgroundColor: item.quest_status === "excellent" ? "#5daf42" : "#e7b840"
            }

        })
        setEvents(events);
        props.propFunction(excellentNum, goodNum, m_excellentNum, m_goodNum );
    }


    const titleFormat = (date) => {
        const year = date.date.year;
        const month = date.date.month + 1;

        return year + "년 " + month + "월";
    }
    const eventClick = (info) => {
        onOpen();
        setDeleteDate(info.event.startStr);
    }
    const onDeleteBtn = async () => {
        onClose();
        const deleteState = await deleteStemp(deleteDate);

        if(deleteState === "success") {
            toast({
                title: "삭제완료",
                description: "삭제되었습니다.",
                status: "success",
                isClosable: true,
            })
            onClose();
            getEvents();


        }else if(deleteState === "fail") {
            toast({
                title: "오류",
                description: "관리자에게 문의바랍니다.",
                status: "error",
                isClosable: true,
            })

        }

    }

    return(
        <>
            <Box
                w={'330px'}

            >
                <FullCalendar
                    aspectRatio={1.5}
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={events}
                    height={'370px'}
                    firstDay={0}
                    titleFormat={titleFormat}
                    headerToolbar={{
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    }
                    }
                    fixedWeekCount={false}
                    eventClick={eventClick}
                />
            </Box>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            스탬프 삭제하기
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {deleteDate} 에 찍은 스탬프를 삭제하시겠습니까?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={onDeleteBtn} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
