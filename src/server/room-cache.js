import {isUser, isNotUser} from './user-helpers';
import {maxRoomSize} from '../shared/config';
import {
  INVALID_PASS,
  MISSING_USER_ID,
  MISSING_ROOM_ID,
  USER_NOT_FOUND,
  USER_EXISTS,
  ROOM_FULL,
} from '../shared/error-codes';

const roomCache = {};

export const getRoom = ({roomId, password}) => {
  const room = roomCache[roomId];
  if (!room) return null;
  if (room.password !== password) throw INVALID_PASS;
  return room;
};

export const createRoom = ({roomId, password, userId, life, ws}) => {
  if (String(roomId).length === 0) throw MISSING_ROOM_ID;
  let users = [];
  const room = {
    password,
    addUser({userId, life, ws}) {
      if (String(userId).length === 0) throw MISSING_USER_ID;
      if (users.some(u => u.userId === userId)) throw USER_EXISTS;
      if (users.length === maxRoomSize) throw ROOM_FULL;
      users = users.concat({userId, life, ws});
    },
    updateUser({userId, life}) {
      const user = users.find(isUser(userId));
      if (!user) throw USER_NOT_FOUND;
      user.life = life;
    },
    removeUser(userId) {
      users = users.filter(isNotUser(userId));
      if (users.length === 0) delete roomCache[roomId];
    },
    users() {
      return users;
    },
    usersExcept(userId) {
      return users.filter(isNotUser(userId));
    },
  };
  room.addUser({userId, life, ws});
  roomCache[roomId] = room;
  return room;
};

export const listRooms = () => {
  return Object.keys(roomCache).map(roomId => {
    const room = roomCache[roomId];
    return {
      roomId,
      userCount: room.users().length,
      isPrivate: String(room.password).length > 0,
    };
  });
};
