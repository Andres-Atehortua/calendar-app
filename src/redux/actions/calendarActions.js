import Swal from 'sweetalert2';
import { fetchWithToken } from '../../helpers/fetch';
import { prepareEvent } from '../../helpers/prepareEvent';
import { calendarTypes } from '../types/calendarTypes';

export const startAddNewAction = ({ notes, title, start, end }) => async (
  dispatch,
  getState
) => {
  const eventBack = {
    notes,
    title,
    start: new Date(start).getTime(),
    end: new Date(end).getTime(),
  };

  const { uid, name } = getState().auth;

  try {
    const resp = await fetchWithToken('events', eventBack, 'POST');
    const body = await resp.json();

    if (body.success) {
      const event = {
        notes,
        title,
        end,
        start,
        id: body.event.id,
        user: {
          _id: uid,
          name,
        },
      };

      dispatch(calendarAddNewAction(event));
    }
  } catch (error) {
    Swal.fire('Error', error, 'error');
  }
};

const calendarAddNewAction = (event) => ({
  type: calendarTypes.ADD_NEW,
  payload: event,
});

export const calendarSetActiveAction = (event) => ({
  type: calendarTypes.SET_ACTIVE,
  payload: event,
});

export const calendarClearActiveAction = () => ({
  type: calendarTypes.CLEAR_ACTIVE,
});

export const startUpdateAction = (event) => async (dispatch) => {
  try {
    const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
    const body = await resp.json();

    if (body.success) {
      dispatch(calendarUpdateAction(event));
    } else {
      Swal.fire('Error', body.error, 'error');
    }
  } catch (error) {
    Swal.fire('Error', error, 'error');
  }
};

const calendarUpdateAction = (event) => ({
  type: calendarTypes.UPDATE,
  payload: event,
});

export const startDeleteAction = () => async (dispatch, getState) => {
  const { id } = getState().calendar.activeEvent;

  try {
    const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
    const body = await resp.json();

    if (body.success) {
      dispatch(calendarDeleteAction());
    } else {
      Swal.fire('Error', body.error, 'error');
    }
  } catch (error) {
    Swal.fire('Error', error, 'error');
  }
};

const calendarDeleteAction = () => ({
  type: calendarTypes.DELETE,
});

export const startLoadAction = () => async (dispatch) => {
  try {
    const resp = await fetchWithToken('events');
    const body = await resp.json();
    const events = prepareEvent(body.events);

    if (body.success) {
      dispatch(loadAction(events));
    }
  } catch (error) {
    Swal.fire('Error', error, 'error');
  }
};

const loadAction = (events) => ({ type: calendarTypes.LOAD, payload: events });

export const clearLogoutAction = () => ({ type: calendarTypes.CLEAR_LOGOUT });
