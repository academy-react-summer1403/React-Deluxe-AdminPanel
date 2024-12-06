// ** React Imports
import { useState, useRef, useEffect } from "react";

// ** Full Calendar & Plugins
import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { locales } from '@fullcalendar/core'

// ** Third Party Components
import { Menu } from "react-feather";
import { Card, CardBody } from "reactstrap";
import { useSchedualAdmin } from "../../../core/services/api/SchedualAdmin";
import { useCourseGroupDetail } from "../../../core/services/api/CourseGroupDetail";
import http from "../../../core/services/interceptor";

const Calendar = ({handleAddEventSidebar, setEventStart}) => {
  const [curMonth, setCurMonth] = useState()
  const { data } = useSchedualAdmin(curMonth);

  const formatEventDateTime = (startDate, startTime) => {
    const date = new Date(startDate); // Parse the startDate
    date.setHours(startTime, 0, 0); // Set the hours based on startTime
    return date.toISOString(); // Convert to ISO string
  };

  const [formattedEvents, setFormattedEvents] = useState([]);

  const CourseGroupDetail = async (groupId) => {
    const query = {};
    if (groupId !== "" && groupId !== null) query.Id = groupId;
    try {
      const res = await http.get("/CourseGroup/Details", { params: query });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (!data) return;

    const fetchCourseGroupDetails = async () => {
      const eventPromises = data.map(async (event) => {
        try {
          const groupDetail = await CourseGroupDetail(event.courseGroupId);

          return {
            title: groupDetail?.courseGroupDto?.courseName || "Unknown Group",
            start: formatEventDateTime(event.startDate, event.startTime),
            end: formatEventDateTime(event.endDate, event.endTime),
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      const resolvedEvents = await Promise.all(eventPromises);

      setFormattedEvents(resolvedEvents.filter((event) => event !== null));
    };

    fetchCourseGroupDetails();
  }, [data]);

  // ** States
  const [events, setEvents] = useState([
    {
      title: "Business Meeting",
      start: "2024-11-17T10:00:00",
      end: "2024-11-17T12:00:00",
      calendar: "Business",
    },
    {
      title: "Family Gathering",
      start: "2024-11-18T14:00:00",
      end: "2024-11-18T16:00:00",
      calendar: "Family",
    },
    {
      title: "Family Gathering",
      start: "2024-12-05T14:00:00",
      end: "2024-12-05T16:00:00",
      calendar: "Family",
    },
  ]);
  const calendarRef = useRef(null);

  const calendarOptions = {
    events: formattedEvents,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "title,nextYear,prev,next,prevYear",
      end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    editable: true,
    eventClick: ({ event: clickedEvent }) => {
      // console.log("Event clicked:", clickedEvent);
        handleAddEventSidebar() // Close sidebar
    },
    dateClick(info) {
      setEventStart(info.dateStr)
      handleAddEventSidebar()
    },
    customButtons: {
      sidebarToggle: {
        text: <Menu className="d-xl-none d-block" />,
        click() {
          console.log("Sidebar toggle clicked");
        },
      },
    },
    locale: "fa-IR",
    firstDay: 6,
    // validRange: {
    //   start: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 16), // 1st day of current month
    //   end: new Date(new Date().getFullYear(), new Date().getMonth() + 21, 0),
    // }
  };

  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0">
        <FullCalendar {...calendarOptions} ref={calendarRef} datesSet={(arg) => {
          setCurMonth(arg)
          }} />
      </CardBody>
    </Card>
  );
};

export default Calendar;
