import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

require('dotenv').config()

const db_username = process.env.DATABASE_USERNAME
const db_password = process.env.DATABASE_PASSWORD



const app = express()

app.use(cors())
app.use(express.json())

// Route
app.use("/api/v1/reviews", reviews)
app.use("*", (req, res) => 
    res.status(404).json({error: "not found"}))

export default app