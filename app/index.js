/* Primary for API */

// Dependencies
const http = require("http");
const url = require("url");

// The server should respond to all requests with a string
let server = http.createServer((req, res) => {

  // Base URL
  let baseURL = "http://" + req.headers.host + "/";

  // Get the URL and parse it
  let regURL = new URL(req.url, baseURL);

  // Get the path
  let path = regURL.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Send the response
  res.end("Hello, World\n");

  // Log the request path
  console.log("Request is received on path: " + trimmedPath);
});

// Start the server, and have it listen on port 3000
server.listen(3000, () => {
  console.log("The server is listening on port 3000 now.");
});