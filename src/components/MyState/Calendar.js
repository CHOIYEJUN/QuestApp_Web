import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import {Box} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getStemp} from "../../hooks/stempHook";

export default function Calendar() {
    const [events, setEvents] = useState([]);
    const userPhone = localStorage.getItem("user_phone");
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
        console.log(info);
    }

    return(
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
    )
}
