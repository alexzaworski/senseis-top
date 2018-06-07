import * as errorCodes from '../shared/error-codes';
import {
  JOIN_ROOM_REQUEST,
  LIST_ROOMS_REQUEST,
  LEAVE_ROOM_REQUEST,
  SET_LIFE_REQUEST,
  WS_ERROR,
} from '../shared/action-types';

import wsSend from './ws-send';
import joinRoom from './message-handlers/join-room';
import leaveRoom from './message-handlers/leave-room';
import listRooms from './message-handlers/list-rooms';
import setLife from './message-handlers/set-life';

const handlers = {
  [JOIN_ROOM_REQUEST]: joinRoom,
  [LIST_ROOMS_REQUEST]: listRooms,
  [LEAVE_ROOM_REQUEST]: leaveRoom,
  [SET_LIFE_REQUEST]: setLife,
};

const handleMessage = ({ws, data}) => {
  const {type} = data;
  const handler = handlers[type] || (() => {});
  try {
    handler({ws, data});
  } catch (error) {
    const knownError = errorCodes[error];
    if (!knownError) console.error(error);
    wsSend(ws, {
      type: WS_ERROR,
      error: knownError || errorCodes.UNKNOWN_ERROR,
      cause: type,
    });
  }
};

export default handleMessage;
