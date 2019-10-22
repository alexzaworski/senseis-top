const {WS_ERROR, CLEAR_ERROR} = require('../../shared/action-types');

const createErrorReducer = ({cause, clearedBy}) => {
  return (state = null, action) => {
    switch (action.type) {
      case WS_ERROR:
        return action.cause === cause ? action.error : state;
      case clearedBy:
        return null;
      case CLEAR_ERROR:
        return action.cause === cause ? null : state;
      default:
        return state;
    }
  };
};

export default createErrorReducer;
