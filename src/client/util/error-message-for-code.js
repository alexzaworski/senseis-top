import {INVALID_PASS, USER_EXISTS, ROOM_FULL} from '../../shared/error-codes';

const errorMessages = {
  [INVALID_PASS]: 'password is incorrect',
  [USER_EXISTS]: 'name is in use in this room',
  [ROOM_FULL]: 'this room is full',
};

const messageForCode = code => errorMessages[code];

module.exports = messageForCode;
