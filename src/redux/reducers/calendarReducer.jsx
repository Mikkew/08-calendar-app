// import moment from 'moment';
// import uuidv4 from '../../utils/GeneratorUUID';
import { types } from '../types/Types';

const initialState = {
  events: [],
  activeEvent: null,
}

export const calendarReducer = (state = initialState, action ) => {
  switch (action.type) {

    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [
          ...state.events,
          action.payload

        ]
      };

    case types.eventUpdateEvent:
      return {
        ...state,
        events: state.events.map( 
          e => (e.id === action.payload.id) ? action.payload : e 
        )
      }
      
    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null
      }
        
    case types.eventDeleteEvent:
      return {
        ...state,
        events: state.events.filter( 
          e => (e.id !== state.activeEvent.id) 
        ),
        activeEvent: null
      }

    case types.eventLoadedEvent:
      return {
        ...state,
        events: [
          ...action.payload
        ]
      }

    case types.eventLogoutEvent:
      return initialState;

    default:
      return state;
  }
}
