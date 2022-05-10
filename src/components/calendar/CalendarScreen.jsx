import React, { useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from "react-big-calendar";
import { messages } from "../../helpers/calendar-messages-español";
import moment from "moment";
import 'moment/locale/es';

import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";


import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { evenStartLoading, eventClearActiveEvent, eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";


const localizer = momentLocalizer(moment); // or globalizeLocalizer

moment.locale('es');

// const events = [{
//   title: 'cumpleaños del jefe ',
//   start: moment().add( 5, 'hours').toDate(),// new Date en moment
//   end: moment().add( 6, 'hours').toDate(),
//   bgcolor:'#fafafa',
//   user : {
//     _id: '123',
//     name: 'Gerardo'
//   }
// }]

export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month');

  useEffect(() => {
    dispatch( evenStartLoading() );
  }, [dispatch])
  

  const onDoubleClick = (e) => {
    //console.log(e);
    dispatch( uiOpenModal() );
  }

  const onSelectEvent = (e) => {
    dispatch( eventSetActive(e) );
  }
  
  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = (e) => {
    dispatch( eventClearActiveEvent() );
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    
    const style = {
      backgroundColor: (uid === event.user._id ) ? "#367CF7" : "#465660",
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
          onSelectSlot = { onSelectSlot }
          selectable = { true }
          view={ lastView }
          components = {{
            event: CalendarEvent 
          }}
        />

        <AddNewFab />  


         { ( activeEvent ) && <DeleteEventFab />}
        
        <CalendarModal />
    </div>
  );
};
