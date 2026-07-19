import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./configs/mongodb.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";

import educatorRouter from "./routes/educatorRoutes.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoutes.js";

import { stripeWebhooks } from "./controllers/paymentController.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

await connectDB();
await connectCloudinary();

// Webhook routes (BEFORE express.json)
app.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

app.post(
  "/webhook/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// Middleware
app.use(cors());
app.use(
  clerkMiddleware({
    authorizedParties: [
      "https://learning-management-system-client-beryl.vercel.app",
    ],
  })
);
app.use(express.json());

// Optional root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Routes
app.use("/api/educator", educatorRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});