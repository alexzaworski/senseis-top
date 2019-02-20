import {UPDATE_USERS} from '../../shared/action-types';
import {getRoom} from '../rooms/room-cache';
import wsSend from '../ws-send';

const setLifeHandler = ({data}) => {
  const {password, roomId, userId, life} = data;
  const room = getRoom({password, roomId, strict: true});
  room.updateUser({userId, life});
  room.allMembersExcept(userId).forEach(member => {
    const {ws, userId} = member;
    wsSend(ws, {
      type: UPDATE_USERS,
      users: room.usersExcept(userId),
    });
  });
};

export default setLifeHandler;
