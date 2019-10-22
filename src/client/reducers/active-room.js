import {
  JOIN_ROOM_SUCCESS,
  LEAVE_ROOM_SUCCESS,
  WS_ERROR,
} from '../../shared/action-types';

const activeRoom = (state = null, action) => {
  switch (action.type) {
    case JOIN_ROOM_SUCCESS:
      return {
        roomId: action.roomId,
        password: action.password,
      };
    case LEAVE_ROOM_SUCCESS:
      return null;
    case WS_ERROR:
      return action.cause === JOIN_ROOM_SUCCESS ? null : state;
    default:
      return state;
  }
};

export default activeRoom;
