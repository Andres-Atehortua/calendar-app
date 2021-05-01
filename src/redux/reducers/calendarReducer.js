import { add } from 'date-fns';
import { calendarTypes } from '../types/calendarTypes';

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'Cumpleaños',
      start: add(new Date(), { hours: 10 }),
      end: add(new Date(), { hours: 13 }),
      notes: 'ay dios mio',
      bgcolor: '#fafafa',
      user: {
        _id: 123,
        name: 'Andrés',
      },
    },
  ],
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
    default:
      return state;
  }
};
