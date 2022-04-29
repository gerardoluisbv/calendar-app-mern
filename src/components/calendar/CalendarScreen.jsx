import React, { useState } from "react";
import { Navbar } from "../ui/Navbar";

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from "react-big-calendar";
import { messages } from "../../helpers/calendar-messages-español";
import moment from "moment";
import 'moment/locale/es';

import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

moment.locale('es');

const events = [{
  title: 'cumpleaños del jefe',
  start: moment().toDate(),// new Date en moment
  end: moment().add( 2, 'hours').toDate(),
  bgcolor:'#fafafa',
  user : {
    _id: '123',
    name: 'Gerardo'
  }
}]

export const CalendarScreen = () => {

  const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) => {
    console.log(e);
  }

  const onSelectEvent = (e) => {
    console.log(e)
  }
  
  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem('lastView', e);
  }


  const eventStyleGetter = (event, start, end, isSelected) => {
    
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "5px",
      opacity: 0.8,
      display: "block",
      color: "white"
    };
    return {
      style: style
    };
  }

  return (
    <div className='calendar-screen'>
      <Navbar />

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter= { eventStyleGetter }
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelectEvent }
          onView={ onViewChange }
          view={ lastView }
          components = {{
            event: CalendarEvent 
          }}
        />

        <CalendarModal />
    </div>
  );
};
