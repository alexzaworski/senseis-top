import {CONNECTION_OPENED, CONNECTION_LOST} from '../../shared/action-types';

const socketConnected = (state = false, action) => {
  switch (action.type) {
    case CONNECTION_OPENED:
      return true;
    case CONNECTION_LOST:
      return false;
    default:
      return state;
  }
};

export default socketConnected;
