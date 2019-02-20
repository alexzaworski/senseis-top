import {JOIN_ROOM_SUCCESS, UPDATE_USERS} from '../../shared/action-types';
import {createRoom, getRoom} from '../rooms/room-cache';
import wsSend from '../ws-send';

import broadcastRoomList from './shared/broadcast-room-list';
import exitRoom from './shared/exit-room';
import leaveRoomHandler from './leave-room';

const joinRoomHandler = ({ws, data}) => {
  const {password, roomId, userId, life, observerMode} = data;

  // we're getting the room in strict mode when connecting as an
  // observer because observers can never be the only person in a
  // room (which means they cannot be first)
  const room = getRoom({password, roomId, userId, strict: observerMode});

  const userPayload = {
    userId,
    life,
    ws,
    observerMode,
    removeUser: () => leaveRoomHandler({ws, data}),
  };

  if (room) {
    room.addUser(userPayload);
    room.allMembersExcept(userId).forEach(member => {
      const {ws, userId} = member;
      wsSend(ws, {
        type: UPDATE_USERS,
        users: room.usersExcept(userId),
      });
    });
  } else {
    createRoom({roomId, password, creator: userPayload});
  }

  wsSend(ws, {
    type: JOIN_ROOM_SUCCESS,
    roomId,
    password,
    userId,
    users: room ? room.usersExcept(userId) : [],
  });

  broadcastRoomList();

  ws.on('close', () => {
    exitRoom({data});
  });
};

export default joinRoomHandler;
