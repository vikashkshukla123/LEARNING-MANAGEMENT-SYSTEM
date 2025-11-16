import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";


// initialize express
const app = express();

// CONNECT TO DATBASE

await connectDB()

await connectDB();

// middlewares
app.use(cors());

// ROUTES
app.get("/", (req, res) => res.send("API Working"));
app.pos('/clerk', express.json(), clerkWebhooks)

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});
