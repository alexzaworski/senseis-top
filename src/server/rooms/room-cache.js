import {
  INVALID_PASS,
  MISSING_ROOM_ID,
  ROOM_NOT_FOUND,
} from '../../shared/error-codes';

import Room from './room';

const roomCache = {};

export const getRoom = ({roomId, password, strict = false}) => {
  const room = roomCache[roomId];
  if (!room && strict) throw ROOM_NOT_FOUND;
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

  const room = new Room({
    roomId,
    password,
    life,
    ws,
    userId,
    idleCallback,
    onEmpty: () => {
      delete roomCache[roomId];
      console.info(`Closed room "${roomId}"`);
    },
  });

  roomCache[roomId] = room;
  console.info(`Created room "${roomId}"`);
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
