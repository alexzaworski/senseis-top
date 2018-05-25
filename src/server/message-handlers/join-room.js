import {JOIN_ROOM_SUCCESS, UPDATE_USERS} from '../../shared/action-types';

import {createRoom, getRoom} from '../room-cache';
import {getUserData} from '../user-helpers';

import wsSend from '../ws-send';

import broadcastRoomList from './shared/broadcast-room-list';
import exitRoom from './shared/exit-room';
import leaveRoomHandler from './leave-room';

const joinRoomHandler = ({ws, data}) => {
  const {password, roomId, userId, life} = data;
  const room = getRoom({password, roomId, userId});

  const userPayload = {
    userId,
    life,
    ws,
    idleCallback: () => leaveRoomHandler({ws, data}),
  };

  if (room) {
    room.addUser(userPayload);
    room.usersExcept(userId).forEach(user => {
      wsSend(user.ws, {
        type: UPDATE_USERS,
        users: room.usersExcept(user.userId).map(getUserData),
      });
    });
  } else {
    createRoom({roomId, password, ...userPayload});
  }

  wsSend(ws, {
    type: JOIN_ROOM_SUCCESS,
    roomId,
    password,
    userId,
    users: room ? room.usersExcept(userId).map(getUserData) : [],
  });

  broadcastRoomList();

  ws.on('close', () => {
    exitRoom({data});
  });
};

export default joinRoomHandler;
