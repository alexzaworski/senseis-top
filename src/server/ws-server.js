import WebSocket from 'ws';

import {cacheSocket} from './socket-cache';
import handleMessage from './handle-message';
import createDebugRoom from './create-debug-room';

const {WS_PORT, NODE_ENV, DEBUG_ROOM} = process.env;

const wss = new WebSocket.Server({port: WS_PORT});

wss.on('connection', ws => {
  cacheSocket(ws);
  ws.on('message', message => {
    try {
      const data = JSON.parse(message);
      handleMessage({data, ws});
    } catch (error) {
      console.error(error);
    }
  });
});

if (NODE_ENV !== 'production' && DEBUG_ROOM) {
  createDebugRoom();
}
