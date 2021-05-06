import { authTypes } from '../types/authTypes';

const initialState = {
  checking: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN:
      return { ...state, ...action.payload, checking: false };

    case authTypes.CHECKING_FINISH:
      return { ...state, checking: false };

    case authTypes.LOGOUT:
      return { checking: false };
    default:
      return state;
  }
};
