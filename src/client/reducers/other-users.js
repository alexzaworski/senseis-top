import {
  JOIN_ROOM_SUCCESS,
  LEAVE_ROOM_SUCCESS,
  UPDATE_USERS,
} from '../../shared/action-types';

const otherUsers = (state = [], action) => {
  switch (action.type) {
    case JOIN_ROOM_SUCCESS:
    case UPDATE_USERS:
      return action.users;
    case LEAVE_ROOM_SUCCESS:
      return [];
    default:
      return state;
  }
};

export default otherUsers;
