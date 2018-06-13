import {
  MISSING_USER_ID,
  MISSING_ROOM_ID,
  USER_NOT_FOUND,
  USER_EXISTS,
  ROOM_FULL,
  INVALID_LIFE,
} from '../../shared/error-codes';
import {isUser, isNotUser} from '../user-helpers';
import {MAX_ROOM_SIZE} from '../../shared/config';

const USER_TIMEOUT = 1800000; //30m

class Room {
  constructor({roomId, password, userId, life, ws, idleCallback, onEmpty}) {
    if (String(roomId).length === 0) throw MISSING_ROOM_ID;
    this._users = [];
    this._timeouts = {};
    this.roomId = roomId;
    this.password = password;
    this.onEmpty = onEmpty;
    this.addUser({userId, life, ws, idleCallback});
  }

  _resetIdleTimeout(user) {
    const {userId, idleCallback} = user;
    this._clearIdleTimeout(userId);
    this._timeouts[userId] = setTimeout(() => {
      console.info(`Booting inactive user from "${this.roomId}"`);
      idleCallback();
    }, USER_TIMEOUT);
  }

  _clearIdleTimeout = userId => {
    clearTimeout(this._timeouts[userId]);
  };

  addUser({userId, life, ws, idleCallback}) {
    const {_users} = this;

    if (String(userId).length === 0) throw MISSING_USER_ID;
    if (isNaN(life)) throw INVALID_LIFE;
    if (_users.some(u => u.userId === userId)) throw USER_EXISTS;
    if (_users.length === MAX_ROOM_SIZE) throw ROOM_FULL;

    const newUser = {userId, life, ws, idleCallback};
    this._resetIdleTimeout(newUser);
    this._users = _users.concat(newUser);
    console.info(
      `Added user to "${this.roomId}", count: ${this._users.length}`
    );
  }

  updateUser({userId, life}) {
    const user = this._users.find(isUser(userId));
    if (!user) throw USER_NOT_FOUND;
    if (isNaN(life)) throw INVALID_LIFE;

    this._resetIdleTimeout(user);
    user.life = parseInt(life);
  }

  users() {
    return this._users;
  }

  usersExcept(userId) {
    return this._users.filter(isNotUser(userId));
  }

  removeUser(userId) {
    this._users = this._users.filter(isNotUser(userId));
    this._clearIdleTimeout(userId);
    console.info(
      `Removed user from "${this.roomId}", count: ${this._users.length}`
    );
    if (this._users.length === 0) this.onEmpty();
  }
}

export default Room;
