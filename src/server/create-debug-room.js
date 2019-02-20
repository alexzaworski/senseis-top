import WebSocket from 'ws';

import joinRoom from './message-handlers/join-room';
import setLife from './message-handlers/set-life';

const ROOM_ID = 'Debug';

const {WS_HOST_DEV, DEBUG_ROOM_PASSWORD = ''} = process.env;

const createDebugRoom = () => {
  [...new Array(4)].map((_, index) => {
    const ws = new WebSocket(WS_HOST_DEV);
    const userId = `Debug ${index}`;
    let life = 5 ** index;
    joinRoom({
      ws,
      data: {
        roomId: ROOM_ID,
        userId,
        password: DEBUG_ROOM_PASSWORD,
        life,
        removeUser: () => 1,
      },
    });
    let next = 1;
    setInterval(() => {
      if (Math.random() < 0.5) return;
      life += next;
      next *= -1;
      setLife({
        ws,
        data: {
          password: DEBUG_ROOM_PASSWORD,
          roomId: ROOM_ID,
          userId,
          life,
        },
      });
    }, 2000);
  });
};

export default createDebugRoom;
