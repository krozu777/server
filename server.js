const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Cliente conectado');

  // cada 10 segundos lanza Sketch 3
  setInterval(() => {
    const trigger = JSON.stringify({ type: "launchSketch3" });
    ws.send(trigger);
    console.log("Trigger enviado");
  }, 2000);
});
