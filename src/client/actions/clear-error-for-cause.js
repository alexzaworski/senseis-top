import {CLEAR_ERROR} from '../../shared/action-types';

const clearErrorForCause = cause => {
  return {
    type: CLEAR_ERROR,
    cause,
  };
};

module.exports = clearErrorForCause;
