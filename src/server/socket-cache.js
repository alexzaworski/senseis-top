import wsSend from './ws-send';

let socketCache = [];

export const cacheSocket = ws => {
  socketCache = socketCache.concat(ws);
  console.info(`Connection opened, count: ${socketCache.length}`);
  ws.on('close', () => removeSocket(ws));
};

export const broadcastToSockets = payload => {
  socketCache.forEach(socket => {
    wsSend(socket, payload);
  });
};

const removeSocket = ws => {
  socketCache = socketCache.filter(socket => socket !== ws);
  console.info(`Connection dropped, count: ${socketCache.length}`);
};
