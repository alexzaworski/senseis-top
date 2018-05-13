import {LIST_ROOMS_SUCCESS} from '../../../shared/action-types';

import {listRooms} from '../../room-cache';
import {getAllSockets} from '../../socket-cache';

import wsSend from '../../ws-send';

const broadcastRooms = () => {
  getAllSockets().forEach(socket =>
    wsSend(socket, {
      type: LIST_ROOMS_SUCCESS,
      rooms: listRooms(),
    })
  );
};

export default broadcastRooms;
