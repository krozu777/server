const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", (ws) => {
  console.log("Cliente conectado");
  clients.push(ws);

  ws.on("close", () => {
    clients = clients.filter((c) => c !== ws);
  });
});

// ENVÍA "activar sketch3" cada 7 segundos
setInterval(() => {
  console.log("⏱ Enviando: activar sketch3");

  const startMsg = JSON.stringify({ type: "launchSketch3", active: true });
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(startMsg);
    }
  });

  setTimeout(() => {
    console.log("⏱ Enviando: desactivar sketch3");

    const stopMsg = JSON.stringify({ type: "launchSketch3", active: false });
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(stopMsg);
      }
    });
  }, 5000); // 5 segundos activo

}, 7000); // 2 de pausa + 5 activo

const PORT = process.env.PORT || 10000;
server.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor WebSocket escuchando en puerto", PORT);
});
