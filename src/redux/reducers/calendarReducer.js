import { calendarTypes } from '../types/calendarTypes';

const initialState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case calendarTypes.ADD_NEW:
      return { ...state, events: [...state.events, action.payload] };
    case calendarTypes.SET_ACTIVE:
      return { ...state, activeEvent: action.payload };
    case calendarTypes.CLEAR_ACTIVE:
      return { ...state, activeEvent: null };
    case calendarTypes.UPDATE:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case calendarTypes.DELETE:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null,
      };

    case calendarTypes.LOAD:
      return { ...state, events: [...action.payload] };

    case calendarTypes.CLEAR_LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};
