import {
  JOIN_ROOM_SUCCESS,
  DECREMENT_LIFE,
  INCREMENT_LIFE,
  RESET_LIFE,
} from '../../shared/action-types';

const self = (state = {userId: '', life: 20}, action) => {
  switch (action.type) {
    case JOIN_ROOM_SUCCESS:
      return {...state, userId: action.userId};
    case INCREMENT_LIFE:
      return {...state, life: state.life + 1};
    case DECREMENT_LIFE:
      return {...state, life: state.life - 1};
    case RESET_LIFE:
      return {...state, life: action.life};
    default:
      return state;
  }
};

export default self;
