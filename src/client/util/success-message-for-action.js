import {JOIN_ROOM_SUCCESS, CONNECTION_OPENED} from '../../shared/action-types';

const messageRenderers = {
  [JOIN_ROOM_SUCCESS]: action => `connected to "${action.roomId}"`,
  [CONNECTION_OPENED]: () => `connected to server`,
};

const successMessageForAction = action => messageRenderers[action.type](action);

module.exports = successMessageForAction;
