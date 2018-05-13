const wsSend = (ws, data) => {
  if (ws.readyState !== 1) return;
  ws.send(JSON.stringify(data));
};

module.exports = wsSend;
