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

const USER_TIMEOUT = 1800000; //30m

const roomCache = {};

export const getRoom = ({roomId, password}) => {
  const room = roomCache[roomId];
  if (!room) return null;
  if (room.password !== password) throw INVALID_PASS;
  return room;
};

export const createRoom = ({
  roomId,
  password,
  userId,
  life,
  ws,
  idleCallback,
}) => {
  if (String(roomId).length === 0) throw MISSING_ROOM_ID;

  let __users = [];
  const __timeouts = {};

  const __resetIdleTimeout = user => {
    const {userId, idleCallback} = user;
    __clearIdleTimeout(userId);
    __timeouts[userId] = setTimeout(idleCallback, USER_TIMEOUT);
  };

  const __clearIdleTimeout = userId => {
    clearTimeout(__timeouts[userId]);
  };

  const room = {
    password,
    addUser({userId, life, ws, idleCallback}) {
      if (String(userId).length === 0) throw MISSING_USER_ID;
      if (__users.some(u => u.userId === userId)) throw USER_EXISTS;
      if (__users.length === maxRoomSize) throw ROOM_FULL;

      const newUser = {userId, life, ws, idleCallback};
      __resetIdleTimeout(newUser);
      __users = __users.concat(newUser);
    },

    updateUser({userId, life}) {
      const user = __users.find(isUser(userId));
      if (!user) throw USER_NOT_FOUND;
      __resetIdleTimeout(user);
      user.life = life;
    },

    removeUser(userId) {
      __users = __users.filter(isNotUser(userId));
      __clearIdleTimeout(userId);
      if (__users.length === 0) delete roomCache[roomId];
    },

    users() {
      return __users;
    },

    usersExcept(userId) {
      return __users.filter(isNotUser(userId));
    },
  };

  room.addUser({userId, life, ws, idleCallback});
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
