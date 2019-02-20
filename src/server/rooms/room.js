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
import {getUserData} from '../user-helpers';

const USER_TIMEOUT = 14400000; //4h

class Room {
  constructor({roomId, password, creator, onEmpty}) {
    if (String(roomId).length === 0) throw MISSING_ROOM_ID;
    this._users = [];
    this._observers = [];
    this._timeouts = {};
    this.roomId = roomId;
    this.password = password;
    this.onEmpty = onEmpty;
    this.addUser(creator);
  }

  _resetIdleTimeout(user) {
    const {userId, removeUser} = user;
    this._clearIdleTimeout(userId);
    this._timeouts[userId] = setTimeout(() => {
      console.info(`Booting inactive user from "${this.roomId}"`);
      removeUser();
    }, USER_TIMEOUT);
  }

  _clearIdleTimeout = userId => {
    clearTimeout(this._timeouts[userId]);
  };

  addUser({userId, life, ws, observerMode, removeUser}) {
    if (String(userId).length === 0) throw MISSING_USER_ID;
    if (this.allMembers().some(u => u.userId === userId)) throw USER_EXISTS;

    if (observerMode) return this.handlerObserver({userId, ws, removeUser});

    if (isNaN(life)) throw INVALID_LIFE;
    if (this.userCount() === MAX_ROOM_SIZE) throw ROOM_FULL;

    const newUser = {userId, life, ws, removeUser};
    this._resetIdleTimeout(newUser);
    this._users = [...this._users, newUser];
    this._logAdded();
  }

  _logAdded() {
    const {_users, _observers} = this;
    const {length: uCount} = _users;
    const {length: oCount} = _observers;
    console.info(
      `Added member to "${this.roomId}" (users: ${uCount} | obs: ${oCount})`
    );
  }

  _logRemoved() {
    const {_users, _observers} = this;
    const {length: uCount} = _users;
    const {length: oCount} = _observers;
    console.info(
      `Removed member from "${this.roomId}" (users: ${uCount} | obs: ${oCount})`
    );
  }

  handlerObserver(newObserver) {
    this._observers = [...this._observers, newObserver];
    this._logAdded();
  }

  updateUser({userId, life}) {
    const user = this._users.find(isUser(userId));
    if (!user) throw USER_NOT_FOUND;
    if (isNaN(life)) throw INVALID_LIFE;

    this._resetIdleTimeout(user);
    user.life = parseInt(life);
  }

  userCount() {
    return this._users.length;
  }

  usersExcept(userId) {
    return this._users.filter(isNotUser(userId)).map(getUserData);
  }

  allMembers() {
    return [...this._users, ...this._observers];
  }

  allMembersExcept(userId) {
    return [...this._users, ...this._observers].filter(isNotUser(userId));
  }

  removeUser(userId) {
    this._users = this._users.filter(isNotUser(userId));
    this._observers = this._observers.filter(isNotUser(userId));
    this._clearIdleTimeout(userId);
    this._logRemoved();
    if (this._users.length === 0) {
      this._observers.forEach(obs => obs.removeUser());
      this.onEmpty();
    }
  }
}

export default Room;
