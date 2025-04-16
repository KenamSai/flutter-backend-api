import express from "express"
import db from "./db.js"
const app = express()
app.use(express.json())
//connecting to db
db();
