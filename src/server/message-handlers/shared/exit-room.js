import {UPDATE_USERS} from '../../../shared/action-types';
import {getRoom} from '../../rooms/room-cache';
import wsSend from '../../ws-send';

import broadcastRoomList from './broadcast-room-list';

const exitRoom = ({data}) => {
  const {userId, roomId, password} = data;

  const room = getRoom({roomId, password});
  if (!room) return;

  room.removeUser(userId);
  const hasRemainingUsers = room.userCount() > 0;
  broadcastRoomList();

  if (hasRemainingUsers) {
    room.allMembers().forEach(member => {
      const {ws, userId} = member;
      wsSend(ws, {
        type: UPDATE_USERS,
        users: room.usersExcept(userId),
      });
    });
  }
};

export default exitRoom;
