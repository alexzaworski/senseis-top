import {CLEAR_ERROR} from '../../shared/action-types';

const clearErrorForCause = cause => {
  return {
    type: CLEAR_ERROR,
    cause,
  };
};

export default clearErrorForCause;
