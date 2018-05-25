import wsSend from './ws-send';

let socketCache = [];

export const cacheSocket = ws => {
  socketCache = socketCache.concat(ws);
  ws.on('close', () => removeSocket(ws));
};

export const broadcastToSockets = payload => {
  socketCache.forEach(socket => {
    wsSend(socket, payload);
  });
};

const removeSocket = ws => {
  socketCache = socketCache.filter(socket => socket !== ws);
};
