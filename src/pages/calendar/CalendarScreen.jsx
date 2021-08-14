import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { CalendarEvent } from '../../components/ui/CalendarEvent';
import { CalendarModal } from '../../components/ui/CalendarModal';
import { NavBar } from '../../components/ui/NavBar';
import { messages } from '../../utils/CalendarMessages';
import { uiOpenModal } from '../../redux/actions/ui';
import { AddNewFab } from '../../components/ui/AddNewFab';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../redux/actions/Events';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es-mx';
import { DeleteEventFab } from '../../components/ui/DeleteEventFab';

moment.locale('es-mx');

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar );
  const { uid } = useSelector(state => state.auth)
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log( event, start, end, isSelected );
    
    const style = {
      backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }

    return {
      style,
    }
  }

  const onDoubleClick = ( e ) => {
    dispatch( uiOpenModal() );
  }
  
  const onSelectEvent = ( e ) => {
    dispatch( eventSetActive(e) );
  }

  const onViewChange = ( e ) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = () => {
    dispatch( eventClearActiveEvent() );
  }

  useEffect(() => {
    
    dispatch( eventStartLoading() );

  }, [dispatch])

  return (
    <div className="calendar-screen">
      <NavBar />

      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectEvent }
        onSelectSlot= { onSelectSlot }
        selectable={ true }
        onView={ onViewChange }
        view={ lastView }
      />
        <AddNewFab />

        { 
          ( activeEvent ) && <DeleteEventFab /> 
        }

      <CalendarModal />
    </div>
  )
}
