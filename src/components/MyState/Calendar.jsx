import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import {
    AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
    Box, Button,
    useDisclosure, useToast
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getBibleReadDates, deleteBibleReadsByDate} from "../../hooks/bibleReadsHook";
import React from "react";

export default function Calendar(props) {
    const [events, setEvents] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [deleteDate, setDeleteDate] = useState(null);
    const toast = useToast();

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const readDates = await getBibleReadDates();
        const thisMonth = new Date().toISOString().substring(0, 7);
        let m_excellentNum = 0;
        readDates.forEach((d) => {
            if (d.substring(0, 7) === thisMonth) m_excellentNum++;
        });
        const excellentNum = readDates.length;
        const goodNum = 0;
        const m_goodNum = 0;

        const eventsList = readDates.map((date) => ({
            start: date,
            display: "background",
            backgroundColor: "#5daf42",
        }));
        setEvents(eventsList);
        props.propFunction(excellentNum, goodNum, m_excellentNum, m_goodNum);
    };

    const titleFormat = (date) => {
        const year = date.date.year;
        const month = date.date.month + 1;
        return year + "년 " + month + "월";
    };

    const eventClick = (info) => {
        onOpen();
        setDeleteDate(info.event.startStr);
    };

    const onDeleteBtn = async () => {
        onClose();
        const deleteState = await deleteBibleReadsByDate(deleteDate);

        if (deleteState === "success") {
            toast({
                title: "삭제완료",
                description: "해당 날짜의 읽기 기록이 삭제되었습니다.",
                status: "success",
                isClosable: true,
            });
            getEvents();
        } else {
            toast({
                title: "오류",
                description: "관리자에게 문의바랍니다.",
                status: "error",
                isClosable: true,
            });
        }
    };

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
                            {deleteDate} 의 성경 읽기 기록을 삭제하시겠습니까?
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
