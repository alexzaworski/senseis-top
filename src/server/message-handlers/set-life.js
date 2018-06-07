import {UPDATE_USERS} from '../../shared/action-types';
import {getRoom} from '../rooms/room-cache';
import {getUserData} from '../user-helpers';
import wsSend from '../ws-send';

const setLifeHandler = ({data}) => {
  const {password, roomId, userId, life} = data;
  const room = getRoom({password, roomId, strict: true});
  room.updateUser({userId, life});
  room.usersExcept(userId).forEach(user => {
    wsSend(user.ws, {
      type: UPDATE_USERS,
      users: room.usersExcept(user.userId).map(getUserData),
    });
  });
};

export default setLifeHandler;
