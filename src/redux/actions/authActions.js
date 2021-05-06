import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';
import { authTypes } from '../types/authTypes';

export const startLoginAction = (email, password) => async (dispatch) => {
  const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
  const body = await resp.json();

  if (body.success) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(loginAction({ uid: body.uid, name: body.name }));
  } else {
    Swal.fire('Error', body.error, 'error');
  }
};

export const startRegisterAction = (user) => async (dispatch) => {
  const resp = await fetchWithoutToken('auth/new', user, 'POST');
  const body = await resp.json();

  if (body.success) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(loginAction({ uid: body.uid, name: body.name }));
  } else {
    Swal.fire('Error', body.error, 'error');
  }
};

export const startChecking = () => async (dispatch) => {
  const resp = await fetchWithToken('auth/renew');
  const body = await resp.json();

  if (body.success) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(loginAction({ uid: body.uid, name: body.name }));
  } else {
    dispatch(checkingFinishAction());
  }
};

const loginAction = (user) => ({ type: authTypes.LOGIN, payload: user });

const checkingFinishAction = () => ({ type: authTypes.CHECKING_FINISH });

export const startLogoutAction = () => (dispatch) => {
  localStorage.clear();
  dispatch(logoutAction());
};

const logoutAction = () => ({ type: authTypes.LOGOUT });
