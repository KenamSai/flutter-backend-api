// Import the built-in 'http' module using ES Module syntax
import http from "http";

// Create a server that handles incoming requests
const server = http.createServer((req, res) => {
    console.log(req.url);
    // Set response header (200 OK, content type text)
    res.writeHead(200, { "Content-Type": "text/json" });

    // Send response text
    res.end(JSON.stringify({
        "name": "Saiteja",
        "id": 2253
    }),);
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
