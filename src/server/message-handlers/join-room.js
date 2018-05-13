import {JOIN_ROOM_SUCCESS, UPDATE_USERS} from '../../shared/action-types';

import {createRoom, getRoom} from '../room-cache';
import {getUserData} from '../user-helpers';

import wsSend from '../ws-send';

import broadcastRooms from './shared/broadcast-rooms';
import exitRoom from './shared/exit-room';

const joinRoomHandler = ({ws, data}) => {
  const {password, roomId, userId, life} = data;
  const room = getRoom({password, roomId, userId});

  if (room) {
    room.addUser({userId, life, ws});
    room.usersExcept(userId).forEach(user => {
      wsSend(user.ws, {
        type: UPDATE_USERS,
        users: room.usersExcept(user.userId).map(getUserData),
      });
    });
  } else {
    createRoom({roomId, password, userId, life, ws});
  }

  wsSend(ws, {
    type: JOIN_ROOM_SUCCESS,
    roomId,
    password,
    userId,
    users: room ? room.usersExcept(userId).map(getUserData) : [],
  });

  broadcastRooms();

  ws.on('close', () => {
    exitRoom({data});
  });
};

export default joinRoomHandler;
