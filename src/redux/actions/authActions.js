import { fetchWithoutToken } from '../../helpers/fetch';
import { authTypes } from '../types/authTypes';

export const startLoginAction = (email, password) => async (dispatch) => {
  const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
  const body = await resp.json();

  if (body.success) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(loginAction({ uid: body.uid, name: body.name }));
  }
};

const loginAction = (user) => ({ type: authTypes.LOGIN, payload: user });
