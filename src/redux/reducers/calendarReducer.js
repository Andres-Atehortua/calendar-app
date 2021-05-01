import { add } from 'date-fns';
import { calendarTypes } from '../types/calendarTypes';

const initialState = {
  events: [
    {
      title: 'Cumpleaños',
      start: add(new Date(), { hours: 10 }),
      end: add(new Date(), { hours: 13 }),
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
    default:
      return state;
  }
};
