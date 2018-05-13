let socketCache = [];

export const cacheSocket = ws => {
  socketCache = socketCache.concat(ws);
  ws.on('close', () => removeSocket(ws));
};

export const getAllSockets = () => socketCache;

const removeSocket = ws => {
  socketCache = socketCache.filter(socket => socket !== ws);
};
