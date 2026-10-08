const http = require("node:http");

let connectionId = 0;

const server = http.createServer((req, res) => {
  const socket = req.socket;

  console.log(
    `[request] ${req.method} ${req.url} | socket=${socket._connectionId}`
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello HTTP");
});

server.on("connection", (socket) => {
  const id = ++connectionId;

  socket._connectionId = id;

  console.log(`[connection] socket=${id}`);

  socket.on("close", () => {
    console.log(`[close] socket=${id}`);
  });
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});