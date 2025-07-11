import morgan from "morgan";

morgan.token("req-body", (req) => JSON.stringify(req.body) || "📭 Empty Body");
morgan.token("req-query", (req) => JSON.stringify(req.query) || "📭 Empty Query");
morgan.token("req-headers", (req) => JSON.stringify(req.headers, null, 2) || "📭 Empty Headers");
morgan.token("res-body", (req, res) => res.locals.body || "📭 Empty Response Body");

var customLogger = morgan(
    `📥 REQUEST: :method :url
        🔗 Query: :req-query
        📥 Headers: req-headers
        📦 Body: :req-body

        📤 RESPONSE: Status :status in :response-time ms
📦 Response Body: :res-body
        -------------------------------------------------`,
    {
        immediate: false,
        stream: { write: (message) => console.log(message.trim()) },
    }
);
function captureResponseBody(req, res, next) {
    const originalSend = res.send;
  
    res.send = function (body) {
      // Save body to res.locals so morgan can access it
      res.locals.body = typeof body === "object" ? JSON.stringify(body) : body;
      return originalSend.call(this, body);//similar to res.send
    };
  
    next();//to reach to routes
  }
  export { customLogger, captureResponseBody };