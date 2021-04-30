import { uiTypes } from '../types/uiTypes';

const initialState = {
  modalOpen: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case uiTypes.OPEN_MODAL:
      return { ...state, openModal: true };
    case uiTypes.CLOSE_MODAL:
      return { ...state, openModal: false };

    default:
      return state;
  }
};
