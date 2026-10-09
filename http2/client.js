const http2 = require("node:http2");

const client = http2.connect("http://localhost:3001");

client.on("connect", () => {
  console.log("HTTP/2 session connected");

  makeRequest("/slow");
  makeRequest("/fast");
  makeRequest("/fast");
});

client.on("error", (err) => {
  console.error("Session error:", err);
});

let remaining = 3;

function makeRequest(path) {
  const startedAt = performance.now();

  const req = client.request({
    ":path": path,
  });

  const streamId = req.id;

  console.log(
    `[request:start] stream=${streamId} ${path}`
  );

  req.on("response", (headers) => {
    console.log(
      `[headers] stream=${streamId} ${path}`,
      headers[":status"]
    );
  });

  req.setEncoding("utf8");

  req.on("data", (chunk) => {
    console.log(
      `[data] stream=${streamId} ${path}:`,
      JSON.stringify(chunk)
    );
  });

  req.on("end", () => {
    const duration = performance.now() - startedAt;

    console.log(
      `[request:end] stream=${streamId} ${path} ${duration.toFixed(2)}ms`
    );

    remaining--;

    if (remaining === 0) {
      client.close();
    }
  });

  req.end();
}