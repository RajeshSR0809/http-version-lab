const net = require("node:net");

const socket = net.createConnection({
  host: "localhost",
  port: 3000,
}, () => {
  console.log("TCP connected");

  const requests = [
    "GET /slow HTTP/1.1\r\nHost: localhost\r\nConnection: keep-alive\r\n\r\n",
    "GET /fast HTTP/1.1\r\nHost: localhost\r\nConnection: keep-alive\r\n\r\n",
    "GET /fast HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n",
  ];

  socket.write(requests.join(""));
});

socket.on("data", (data) => {
  console.log("\n--- DATA RECEIVED ---");
  console.log(data.toString());
});

socket.on("close", () => {
  console.log("TCP connection closed");
});