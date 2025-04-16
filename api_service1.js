import express from "express";
import morgan from "morgan";
import timeLimiter from "./time_limiter.js";
const app = express();
app.use(express.json());
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

let users = [
    { "name": "Saiteja", "id": 1 },
    { "name": "Swathi", "id": 2 },
    { "name": "Manisha", "id": 3 },
];


app.get("/", timeLimiter, (req, res, next) => {
    try {
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }

});
app.post("/addUser", (req, res, next) => {
    try {
        const { name, id } = req.body;
        if (!name || !id) {
            res.status(400).json({
                "status": "name and id required"
            });

        }
        else {
            const isUserExist = users.some((user) => user.id == id);
            if (isUserExist) {
                res.status(409).json({
                    "status": "User Already exists!",
                    "users": users
                });
            } else {
                users.push({
                    "name": name,
                    "id": id,
                });
                res.status(200).json({
                    "status": "User Added!",
                    "users": users
                });
            }

        }
    } catch (error) {
        next(error);
    }

});

app.delete("/deleteUser", (req, res) => {
    try {
        const { name, id } = req.body;
        if (!name || !id) {
            res.status(400).json({
                "status": "name and id required"
            });

        }
        else {

            const isUserExist = users.some((user) => (user.id == id && user.name == name));
            console.log(isUserExist);
            if (isUserExist) {
                users = users.filter(user => user.id !== id);
                res.status(200).json({
                    "status": `User: ${name} Deleted!`,
                    "users": users
                });
            } else {
                res.status(404).json({
                    "status": `User: ${name} not found!`,
                });
            }
        }
    } catch (error) {
        next(error);
    }


});

app.put("/updateUser/:id", (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const isUserExist = users.some((user) => user.id == id);
        if (isUserExist) {
            let user = users.find((user) => user.id == id);
            user.name = name || user.name;
            res.status(200).json({
                status: `User: ${id} updated!`,
                users: users.find((user) => user.id == id)
            });
        } else {
            res.status(404).json({
                status: `User: ${id} not found!`,
            });
        }
    } catch (error) {
        next(error);
    }
});

app.get("/crash", (req, res, next) => {
    let error = new Error("I crashed manually",);
    error.status = 500;
    next(error);

});
// This handles all undefined routes (404)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});
app.listen(3000, (req, res) => {
    console.log("Server running on http://localhost:3000");
});