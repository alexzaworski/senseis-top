import WebSocket from 'ws';

import joinRoom from './message-handlers/join-room';
import setLife from './message-handlers/set-life';

const ROOM_ID = 'Debug';
const PASS = '';

const createDebugRoom = () => {
  [...new Array(4)].map((_, index) => {
    const ws = new WebSocket(process.env.WS_HOST_DEV);
    const userId = `Debug ${index}`;
    let life = 5 ** index;
    joinRoom({
      ws,
      data: {
        roomId: ROOM_ID,
        userId,
        password: PASS,
        life,
        idleCallback: () => 1,
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
          password: PASS,
          roomId: ROOM_ID,
          userId,
          life,
        },
      });
    }, 2000);
  });
};

export default createDebugRoom;
