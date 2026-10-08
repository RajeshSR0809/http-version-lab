const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log(`[request] ${req.method} ${req.url}`);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  res.end("Hello HTTP");
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});