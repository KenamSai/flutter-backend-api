// Import express
import express from "express";
import morgan from "morgan";
// Create an Express app
const app = express();
//for getting request data
app.use(express.json())
 // 🔹 Morgan for Logging Incoming Requests
morgan.token("req-body", (req) => JSON.stringify(req.body) || "📭 Empty Body");
morgan.token("req-query", (req) => JSON.stringify(req.query) || "📭 Empty Query");
morgan.token("req-headers", (req) => JSON.stringify(req.headers, null, 2) || "📭 Empty Headers");
app.use(
    morgan(
        `📥 REQUEST: :method :url
        🔗 Query: :req-query
        📥 Headers: req-headers
        📦 Body: :req-body
        -------------------------------------------------`,
        {
            immediate: true, // Log requests as soon as they arrive
            stream: { write: (message) => console.log(message.trim()) },
        }
    )
);
// const logger = (req, res, next) => {
//     console.log("🔹 Incoming Request 🔹");
//     console.log(`🔗 URL       : ${req.url}`);
//     console.log(`📍 Method    : ${req.method}`);

//     // Log Request Body only if it's not empty
//     if (Object.keys(req.body).length > 0) {
//         console.log("📥 Request Body :");
//         console.dir(req.body, { depth: null });
//     } else {
//         console.log("📭 Request Body : Empty");
//     }

//     console.log("-------------------------------------------------");
//     next();
// }
const loginLogger = (req, res, next) => {
    console.log(`login route-----`)
    next();
};
//app.use(logger)


// Define a basic route
app.get("/", (req, res) => {
    res.status(200).send("Hello from Express!");
});

app.get("/about", (req, res) => {
    const user = {
        id: 1,
        name: "John Doe",
        email: "john@example.com"
    };
    res.status(200).json(user);
});

app.post("/loginData", loginLogger, (req, res) => {
    const { name, id } = req.body;
    if (!name || !id) {
        res.status(400).json("Invalid request: Name or ID is missing");
    } else if (id == 2253) {
        res.status(200).json("Successful")
    } else {
        res.status(404).json("No data found ");
    }


});

// app.post("/loginData", (req, res, next) => {
//     try {
//         const err = Error("this a error")
//        // err.status=600
//         throw err;
//     } catch (err) {
//         next(err); // Pass error to error-handling middleware
//     }
// });
// // ❌ Handle all invalid routes
// app.use((req, res) => {
//     console.error("💥 Routes not found:");
//     res.status(404).json({
//         error: "Route not found"
//     });
// });


// ✅ Global Error Handling Middleware (Always at the end)
app.use((err, req, res, next) => {
    console.error("💥 Error:", err.message, "status code", err.status);

    if (err.status) {
        res.status(err.status).json({ error: err.message });
    } else {
        res.status(500).json({ error: "Internal Server Error@" });
    }
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
