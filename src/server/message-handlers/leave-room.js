import {LEAVE_ROOM_SUCCESS} from '../../shared/action-types';
import wsSend from '../ws-send';
import exitRoom from './shared/exit-room';

const leaveRoomHandler = ({ws, data}) => {
  exitRoom({data});
  wsSend(ws, {
    type: LEAVE_ROOM_SUCCESS,
  });
};

export default leaveRoomHandler;
