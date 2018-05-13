import {
  INVALID_PASS,
  USER_EXISTS,
  ROOM_FULL,
  CONNECTION_LOST,
} from '../../shared/error-codes';

const errorMessages = {
  [INVALID_PASS]: 'password is incorrect',
  [USER_EXISTS]: 'name is in use in this room',
  [ROOM_FULL]: 'this room is full',
  [CONNECTION_LOST]: 'server connection lost',
};

const messageForCode = code => errorMessages[code];

module.exports = messageForCode;
