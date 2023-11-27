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

export default function Calendar() {
    const [events, setEvents] = useState([]);
    const userPhone = localStorage.getItem("user_phone");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [deleteDate, setDeleteDate] = useState(null);
    const toast = useToast();

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const stemp = await getStemp(userPhone);
        const events = stemp.RESULT.map((item) => {
            return {
                start: item.quest_date,
                display: "background",
                phone: item.phone,
                backgroundColor: item.quest_status === "excellent" ? "#5daf42" : "#e7b840"
            }
        })
        setEvents(events);
    }


    const titleFormat = (date) => {
        const year = date.date.year;
        const month = date.date.month + 1;

        return year + "년 " + month + "월";
    }
    const eventClick = (info) => {
        onOpen();
        setDeleteDate(info.dateStr);
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
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={events}
                    height={'430px'}
                    firstDay={0}
                    titleFormat={titleFormat}
                    headerToolbar={{
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    }
                    }
                    fixedWeekCount={false}
                    dateClick={eventClick}
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
                            스템프 삭제하기
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {deleteDate} 에 찍은 스템프를 삭제하시겠습니까?
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
