import {arrayMove} from 'react-sortable-hoc';

import {
  JOIN_ROOM_SUCCESS,
  LEAVE_ROOM_SUCCESS,
  UPDATE_USERS,
  SET_SORT_ORDER,
} from '../../shared/action-types';
const normalizeOrder = (prevState, action) => {
  const oldLength = prevState.length;
  const newLength = action.users.length;
  const diff = oldLength - newLength;

  if (diff < 0) {
    const newEntries = [...new Array(Math.abs(diff))].map((_, index) => {
      return index + oldLength;
    });
    return [...prevState, ...newEntries];
  }

  if (diff > 0) {
    return prevState.filter(i => i < newLength);
  }

  return prevState;
};

const setOrder = (state, action) => {
  const {oldIndex, newIndex} = action;
  return arrayMove(state, oldIndex, newIndex);
};

const sortOrder = (state = [], action) => {
  switch (action.type) {
    case JOIN_ROOM_SUCCESS:
    case UPDATE_USERS:
      return normalizeOrder(state, action);
    case LEAVE_ROOM_SUCCESS:
      return [];
    case SET_SORT_ORDER:
      return setOrder(state, action);
    default:
      return state;
  }
};

export default sortOrder;
