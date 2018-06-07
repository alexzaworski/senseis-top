import {
  WS_ERROR,
  CLEAR_TOAST,
  JOIN_ROOM_SUCCESS,
  CONNECTION_OPENED,
  CONNECTION_LOST,
} from '../../shared/action-types';
import errorMessageForCode from '../util/error-message-for-code';
import {ROOM_FULL} from '../../shared/error-codes';

const supportedWsErrors = [ROOM_FULL];
const dataForActions = {
  [JOIN_ROOM_SUCCESS]: {
    messageForAction: action => `connected to "${action.roomId}"`,
    toastType: 'success',
  },
  [CONNECTION_OPENED]: {
    messageForAction: () => `connected to server`,
    toastType: 'success',
  },
  [CONNECTION_LOST]: {
    messageForAction: () => 'server connection lost',
    toastType: 'error',
  },
};

const toast = (state = null, action) => {
  const {type} = action;

  if (type === CLEAR_TOAST) return null;

  if (type === WS_ERROR && supportedWsErrors.includes(action.error)) {
    return {
      toastType: 'error',
      message: errorMessageForCode(action.code),
    };
  }

  const toastData = dataForActions[type];
  if (!toastData) return state;
  const {toastType, messageForAction} = toastData;
  return {toastType, message: messageForAction(action)};
};

module.exports = toast;
