/* Primary for API */

// Dependencies
const http = require("http");
const url = require("url");

// The server should respond to all requests with a string
let server = http.createServer((req, res) => {

  // Base URL
  let baseURL = "http://" + req.headers.host + "/";
  // Get the URL and parse it
  let reqURL = new URL(req.url, baseURL);

  // Get the path
  let path = reqURL.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the Query string as an Object
  let queryStringObject = reqURL.searchParams;

  // Get the HTTP method
  let method = req.method.toUpperCase();

  // Send the response
  res.end("Hello, World\n");

  // Log the request path
  console.log("Request is received on path: " + trimmedPath + " with method: " + method + " and with these query string parameters", queryStringObject.toString());
});

// Start the server, and have it listen on port 3000
server.listen(3000, () => {
  console.log("The server is listening on port 3000 now.");
});