/* Primary for API */

// Dependencies
const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;

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

  // Get the headers as an object
  let headers = req.headers;

  //Get the payload, if any
  let decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    // Send the response
    res.end("Hello, World\n");

    // Log the request path
    console.log("The request was received with this payload: ", buffer);
  });
});

// Start the server, and have it listen on port 3000
server.listen(3000, () => {
  console.log("The server is listening on port 3000 now.");
});