import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Box, useToast} from "@chakra-ui/react";
import {getStemp} from "../../hooks/stempHook";
import {getToday} from "../../util/DateUtil";

const Calendar = forwardRef((props, ref) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [newEvents, setNewEvents] = useState([]);
    const userPhone = localStorage.getItem("user_phone");
    const toster = useToast();
    const today = getToday();


    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const stemp = await getStemp(userPhone);
        const events = stemp.map((item) => {
            return {
                start: item.quest_date,
                display: "background",
                phone: item.phone,
                isSend: false,
                backgroundColor: "#646464",
            }
        })
        setEvents(events);
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
                duration: 1000,
            })
            return;
        }
    }


    const dateClick = (info) => {
        const clickedDate = info.dateStr;

        if(clickedDate >= today) {
            toster({
                title: "오류",
                description: "과거 날짜만 선택할 수 있습니다.",
                status: "error",
                isClosable: true,
                duration: 1000,
            })
            return;
        }
        const isSelected = events.find((event) => event.start === clickedDate);
        if (isSelected) {
            // 이미 선택된 날짜를 다시 클릭하면 색깔 지우고 events에서 삭제
            if(isSelected.isSend) {
                setSelectedDate(null);
                setEvents(events.filter((event) => event.start !== clickedDate));
                setNewEvents(newEvents.filter((event) => event.start !== clickedDate));
            }
        } else {
            // 클릭한 날짜를 색깔로 표시하고 events에 추가
            setSelectedDate(clickedDate);
            setEvents([...events, {  start: clickedDate, display: "background", phone : userPhone, isSend : true } ]);
            setNewEvents([...newEvents, {  start: clickedDate, display: "background", phone : userPhone, isSend : true } ]);
        }
    };

    useImperativeHandle(ref, () => ({
        getChildValue: () => {
            return newEvents;
        }
    }));

    return (
        <Box w={"330px"}>
            <FullCalendar
                aspectRatio={1.5}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                height={"430px"}
                firstDay={0}
                titleFormat={titleFormat}
                headerToolbar={{
                    left: "prev",
                    center: "title",
                    right: "next",
                }}
                fixedWeekCount={false}
                dateClick={dateClick}
                events={events}
                eventClick={eventClicker}

            />
        </Box>

    );
});

export default Calendar;
