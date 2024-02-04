import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState} from "react";
import {Box, Center, useToast} from "@chakra-ui/react";
import {getAllStemp, getUserCount} from "../../hooks/stempHook";

const Calendar = (props) => {
    const [events, setEvents] = useState([]);
    const userPhone = localStorage.getItem("user_phone");
    const toster = useToast();


    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const stemp = await getAllStemp(userPhone);

        // 회원 수 (여기서는 6명으로 가정)
        const totalMembers  = await getUserCount();

        // 날짜별 수행 횟수를 계산하기 위한 객체 초기화
        let countByDate = {};
        let hartImg = "";

        // 날짜별 수행 횟수 계산
        stemp.forEach((item) => {
            if (countByDate[item.quest_date]) {
                countByDate[item.quest_date]++;
            } else {
                countByDate[item.quest_date] = 1;
            }
        });

        // 이벤트 생성
        const events = Object.keys(countByDate).map((date) => {
            // 비율 계산
            const rate = (countByDate[date] / totalMembers) * 100;

            // 색상 결정
            let backgroundColor;
            if (rate <= 40) {
                backgroundColor = "#e8e4ba"; // 0%~40%
                hartImg = ""
            } else if (rate <= 80) {
                backgroundColor = "#3298af"; // 41%~80%
                hartImg = ""
            } else {
                backgroundColor = "#3298af"; // 81%~100%
                hartImg = "https://firebasestorage.googleapis.com/v0/b/dailyquest-a912d.appspot.com/o/%ED%95%98%ED%8A%B8.png?alt=media&token=1bd227db-f679-4a83-8557-0b7e4f7a200f"
            }

            return {
                start: date,
                display: "background",
                backgroundColor: backgroundColor,
                imageUrl : hartImg
            };
        });

        setEvents(events);
        props.propFunction(stemp);
    }

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
