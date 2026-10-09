const http2 = require("node:http2");

const server = http2.createServer();


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let nextSessionId = 1;


server.on("session", (session) => {

});



/* This is like the connect in the http */
server.on("stream", async (stream, headers) => {
    const connectionId = ++nextSessionId
    const session = stream.session.sessionId;
    console.log(`${stream.id} ${connectionId}`)

});



server.listen(3001, () => {
  console.log("HTTP/2 server listening on http://localhost:3001");
});