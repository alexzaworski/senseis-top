import {LIST_ROOMS_SUCCESS} from '../../shared/action-types';
import {listRooms} from '../room-cache';
import wsSend from '../ws-send';

const listRoomsHandler = ({ws}) => {
  wsSend(ws, {
    type: LIST_ROOMS_SUCCESS,
    rooms: listRooms(),
  });
};

export default listRoomsHandler;
