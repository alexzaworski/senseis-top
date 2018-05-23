import {CONNECTION_OPENED, WS_ERROR} from '../../shared/action-types';
import {CONNECTION_LOST} from '../../shared/error-codes';

const socketConnected = (state = false, action) => {
  switch (action.type) {
    case CONNECTION_OPENED:
      return true;
    case WS_ERROR:
      return action.error === CONNECTION_LOST ? false : state;
    default:
      return state;
  }
};

export default socketConnected;
