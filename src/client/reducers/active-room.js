import {JOIN_ROOM_SUCCESS, LEAVE_ROOM_SUCCESS} from '../../shared/action-types';

const activeRoom = (state = null, action) => {
  switch (action.type) {
    case JOIN_ROOM_SUCCESS:
      return {
        roomId: action.roomId,
        password: action.password,
      };
    case LEAVE_ROOM_SUCCESS:
      return null;
    default:
      return state;
  }
};

module.exports = activeRoom;
