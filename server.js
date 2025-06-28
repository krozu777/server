setInterval(() => {
  const msg = JSON.stringify({ type: "launchSketch3", active: true });
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });

  // 5 segundos después, manda el "apagado"
  setTimeout(() => {
    const stopMsg = JSON.stringify({ type: "launchSketch3", active: false });
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(stopMsg);
      }
    });
  }, 5000); // <- duración exacta de sketch3
}, 2000 + 5000); // cada 7 segundos (2 de pausa + 5 de sketch)
