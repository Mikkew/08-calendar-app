import Swal from "sweetalert2";

import { serviceAPI } from "../../utils/Axios";
import { prepareEvent } from "../../utils/PrepareEvents";
import { types } from "../types/Types";


export const eventStartAddNew = (event) => {
  return async(dispatch, getState) => {
    
    const auth = getState().auth;
    const response = await serviceAPI('POST', 'events', event);
    const body = response.data;

    if(body.ok) {
      delete auth.checking;
      event.user = auth;

      dispatch( eventAddNew(event) );
    }

  }
}


export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
});


export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
});


export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent
});


export const eventStartUpdate = (event) => {
  return async(dispatch) => {
    try {
      
      const response = await serviceAPI('PUT', `events/${event.id}`, event);
      const body = response.data;

      if(body.ok) {

        dispatch( eventUpdateEvent(event) );

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${body.msg}`
        });

      }

    } catch (error) {
      console.error(error);
    }
  }
}


const eventUpdateEvent = (event) => ({
  type: types.eventUpdateEvent,
  payload: event
});


export const eventStartDelete = () => {
  return async(dispatch, getState) => {

    try {
      
      const { id } = getState().calendar.activeEvent;
      const response = await serviceAPI('DELETE', `events/${id}`);
      const body = response.data;
      
      if(body.ok) {

        dispatch( eventDeleteEvent() );

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${body.msg}`
        });

      }

    } catch (error) {
      console.error(error);
    }

  }
}


const eventDeleteEvent = () => ({
  type: types.eventDeleteEvent
});


export const eventStartLoading = () => {
  return async(dispatch) => {

    try {
      
      const response = await serviceAPI('GET', 'events');
      const { eventos } = response.data;
      const events = prepareEvent(eventos)

      dispatch( eventLoaded(events) );

    } catch (error) {
      console.error(error);
    }

  }
};

const eventLoaded = (events) => ({
  type: types.eventLoadedEvent,
  payload: events
});

export const eventLogoutEvent = () => ({
  type: types.eventLogoutEvent
})
