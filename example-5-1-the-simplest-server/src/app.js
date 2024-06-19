import http from "http";

// Creates the server and starts it running.
const server = http.createServer(handleRequest);
server.listen(3000);

/**
 * Function which handles the HTTP request.
 *
 * Simply serves the text "Hello, world!" back to the requestor,
 * with the HTTP status code set to 200 (OK) and the "Content-Type" header set to "text/plain".
 */
function handleRequest(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end("Hello, world!");
}
