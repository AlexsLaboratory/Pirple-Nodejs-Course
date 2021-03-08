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

    //Choose the handler this request should go to. If one is not found use the notFound handler
    let chosenHandler = typeof (router[trimmedPath]) !== "undefined" ? router[trimmedPath] : handlers.notFound;

    // Construct data object to send to handler
    let data = {
      "trimmedPath": trimmedPath,
      "queryStringObject": queryStringObject,
      "method": method,
      "headers": headers,
      "payload": buffer
    };

    // Route request to chosen handler specified in the router
    chosenHandler(data, (statusCode, payload) => {
      // Use the status code called back by handler, or default 200
      statusCode = typeof (statusCode) == "number" ? statusCode : 200;

      // Use the payload called back by the handler, or default to empty object
      payload = typeof (payload) == "object" ? payload : {};

      // Convert the payload to a string
      let payloadString = JSON.stringify(payload);

      // Return the response
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log("Returning this response: ", statusCode, payloadString);
    });
  });
});

// Start the server, and have it listen on port 3000
server.listen(3000, () => {
  console.log("The server is listening on port 3000 now.");
});

// Define handlers
let handlers = {};

// Sample handler
handlers.sample = (data, callback) => {
  // Callback HTTP status code, and a payload object
  callback(406, {"name": "sample handler"});
};

// Not found handler
handlers.notFound = (data, callback) => {
  callback(404);
}

// Define a request router
let router = {
  "sample": handlers.sample
}