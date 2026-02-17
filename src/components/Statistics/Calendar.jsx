import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { Box, Center, useToast } from "@chakra-ui/react";
import { getAllBibleReads, getBibleReadDatesFromChapters } from "../../hooks/bibleReadsHook";
import { getUserCount } from "../../hooks/stempHook";

const Calendar = (props) => {
    const [events, setEvents] = useState([]);
    const toster = useToast();

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const allUsers = await getAllBibleReads();
        const totalMembers = await getUserCount();

        // 날짜별로 그날 성경 읽은 사람 수
        const countByDate = {};
        const propsData = [];

        allUsers.forEach((user) => {
            const readDates = getBibleReadDatesFromChapters(user.chapters || {});
            readDates.forEach((date) => {
                countByDate[date] = (countByDate[date] || 0) + 1;
                propsData.push({
                    uid: user.uid,
                    user_name: user.user_name || "",
                    quest_date: date,
                    quest_status: "excellent",
                });
            });
        });

        let hartImg = "";
        const eventsList = Object.keys(countByDate).map((date) => {
            const rate = totalMembers > 0 ? (countByDate[date] / totalMembers) * 100 : 0;
            let backgroundColor;
            if (rate <= 40) {
                backgroundColor = "#e8e4ba";
                hartImg = "";
            } else if (rate <= 80) {
                backgroundColor = "#3298af";
                hartImg = "";
            } else {
                backgroundColor = "#3298af";
                hartImg = "https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%ED%95%98%ED%8A%B8.png?alt=media&token=1bd227db-f679-4a83-8557-0b7e4f7a200f";
            }
            return {
                start: date,
                display: "background",
                backgroundColor,
                imageUrl: hartImg,
            };
        });

        setEvents(eventsList);
        props.propFunction(propsData);
    };

    const titleFormat = (date) => {
        const year = date.date.year;
        const month = date.date.month + 1;

        return year + "년 " + month + "월";
    };

    const eventClicker = (info) => {
        if(!info.event.extendedProps.isSend) {
            toster({
                title: "오류",
                description: "이미 스탬프를 받은 날 입니다.",
                status: "error",
                isClosable: true,
            })
            return;
        }
    }

    const renderEventContent = (eventInfo) => {
        const img = eventInfo.event.extendedProps.imageUrl;
        return (
            <Center
                alignItems={'center'}
                justifyContent={'center'}
                width={"50px"}
                height={"50px"}
                zIndex={99}
            >
                {img === "" ? "" : <img src={img} alt={eventInfo.event.title} style={{ width: '30px', height: '30px' }} />}
            </Center>
        );
    };


    return (
        <Box w={"330px"}>
            <FullCalendar
                aspectRatio={1.5}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                height={"360px"}
                firstDay={0}
                titleFormat={titleFormat}
                headerToolbar={{
                    left: "prev",
                    center: "title",
                    right: "next",
                }}
                fixedWeekCount={false}
                events={events}
                eventClick={eventClicker}
                eventContent={renderEventContent}

            />
        </Box>

    );
};

export default Calendar;
