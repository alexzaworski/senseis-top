import {combineReducers} from 'redux';

import {JOIN_ROOM_REQUEST, JOIN_ROOM_SUCCESS} from '../../shared/action-types';

import otherUsers from './other-users';
import rooms from './rooms';
import activeRoom from './active-room';
import attemptedRoom from './attempted-room';
import self from './self';
import createErrorReducer from './create-error-reducer';
import toast from './toast';
import socketConnected from './socket-connected';

const noop = state => state || null;

const reducers = combineReducers({
  otherUsers,
  rooms,
  self,
  activeRoom,
  attemptedRoom,
  toast,
  socketConnected,
  storedRoom: noop,
  errors: combineReducers({
    joinRoom: createErrorReducer({
      cause: JOIN_ROOM_REQUEST,
      clearedBy: JOIN_ROOM_SUCCESS,
    }),
  }),
});

export default reducers;
