const http = require("node:http");
const { performance } = require("node:perf_hooks");


let nextSocketId = 0;
let socketIds = new WeakMap();

const server = http.createServer((req, res) => {
    const socket = req.socket;
    const socketId = socketIds.get(socket);
    const startedAt  = performance.now();

    console.log(`[request:start] socket=${socketId} ${req.method} ${req.url}`);

    res.on("finish", () => {
        const duration = performance.now() - startedAt;

        console.log(`[response:finish] socket=${socketId} ${req.method} ${req.url}` );
    })

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
});




/* Listen to the connection event */
server.on("connection", (socket) => {
    let socketId = ++nextSocketId;
    socketIds.set(socket, socketId);

    console.log('[connection]', `socket=${socketId} ${socket.remoteAddress} ${socket.remotePort} ${socket.localAddress}`);

    socket.on("close", () => {
        console.log(`[connection:close] socket=${socketId}`)
    });

    
});



/* Listen to the port 3000 */
server.listen(3000, () => {
  console.log("HTTP/1.1 lab listening on http://localhost:3000");
});