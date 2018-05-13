import WebSocket from 'ws';
import {cacheSocket} from './socket-cache';
import handleMessage from './handle-message';

const wss = new WebSocket.Server({port: process.env.WS_PORT});

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
