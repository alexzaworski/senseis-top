import {LIST_ROOMS_SUCCESS} from '../../../shared/action-types';

import {listRooms} from '../../rooms/room-cache';
import {broadcastToSockets} from '../../socket-cache';

const broadcastRoomList = () => {
  const currentRoomData = listRooms();
  broadcastToSockets({
    type: LIST_ROOMS_SUCCESS,
    rooms: currentRoomData,
  });
};

export default broadcastRoomList;
