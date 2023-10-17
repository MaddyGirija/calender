import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import calenderService from "../api/calendarData";
import { useEffect, useState } from "react";

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  // State to set the month events
  const [monthData, setMonthData] = useState();

  // API Call Starts -----------------------------------------

  const getMonthInput = async () => {
    await calenderService
      .getMonthDatas()
      .then((response) => {
        setMonthData(response?.data);
      })
      .catch((errors) => errors);
  };

  useEffect(() => {
    getMonthInput();
  }, []);

  // API Call Ends -------------------------------------------

  const monthEvents = monthData?.flatMap((obj) =>
    obj.celebrations.map((celebration) => ({
      start: moment(obj.date).toDate(),
      end: moment(obj.date).add(1, "days").toDate(),
      title: celebration.title,
    }))
  );

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={monthEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
      />
    </div>
  );
};

export default MyCalendar;
