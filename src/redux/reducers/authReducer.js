import { authTypes } from '../types/authTypes';

const initialState = {
  checking: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN:
      return { ...state, checking: false, ...action.payload };
    default:
      return state;
  }
};
