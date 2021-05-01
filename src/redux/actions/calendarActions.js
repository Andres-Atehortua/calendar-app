import { calendarTypes } from '../types/calendarTypes';

export const calendarSetActiveAction = (event) => ({
  type: calendarTypes.SET_ACTIVE,
  payload: event,
});

export const calendarAddNewAction = (event) => ({
  type: calendarTypes.ADD_NEW,
  payload: event,
});

export const calendarClearActiveAction = () => ({
  type: calendarTypes.CLEAR_ACTIVE,
});
