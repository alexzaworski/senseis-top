import {JOIN_ROOM_SUCCESS} from '../../shared/action-types';

const messageRenderers = {
  [JOIN_ROOM_SUCCESS]: action => `Connected to "${action.roomId}"`,
};

const successMessageForAction = action => messageRenderers[action.type](action);

module.exports = successMessageForAction;
