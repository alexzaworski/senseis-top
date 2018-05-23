import {
  WS_ERROR,
  CLEAR_TOAST,
  JOIN_ROOM_SUCCESS,
  CONNECTION_OPENED,
} from '../../shared/action-types';

import {ROOM_FULL, CONNECTION_LOST} from '../../shared/error-codes';

const supportedErrors = [ROOM_FULL, CONNECTION_LOST];
const supportedSuccess = [JOIN_ROOM_SUCCESS, CONNECTION_OPENED];

const toast = (state = null, action) => {
  switch (action.type) {
    case WS_ERROR:
      return supportedErrors.includes(action.error)
        ? {
            toastType: 'error',
            code: action.error,
          }
        : state;
    case CLEAR_TOAST:
      return null;
    default:
      return supportedSuccess.includes(action.type)
        ? {
            toastType: 'success',
            action,
          }
        : state;
  }
};

module.exports = toast;
