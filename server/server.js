// import dotenv from "dotenv";
// dotenv.config();

// import express from 'express';
// import cors from 'cors';
// import connectDB from './configs/mongodb.js';
// import connectCloudinary from './configs/cloudinary.js';
// import { clerkMiddleware } from '@clerk/express';

// import educatorRouter from './routes/educatorRoutes.js';
// import courseRouter from './routes/courseRoute.js';
// import userRouter from './routes/userRoutes.js';

// const app = express();

// // CONNECT TO DATABASE
// await connectDB();
// await connectCloudinary();

// // Middlewares
// app.use(cors());
// app.use(clerkMiddleware()); // sets req.auth.userId
// app.use(express.json()); // parse JSON bodies

// // Test route
// app.get('/', (req, res) => res.send("API Working"));

// // Routes
// app.use('/api/educator', educatorRouter);
// app.use('/api/course', courseRouter);
// app.use('/api/user', userRouter);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
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

const app = express();

await connectDB();
await connectCloudinary();

// ------------------------------
// STRIPE WEBHOOK — MUST COME FIRST
// ------------------------------
// app.post(
//   "/webhook/stripe",
//   express.raw({ type: "application/json" }),   // use express.raw (NOT bodyParser.raw)
//   (req, res, next) => {
//     req.rawBody = req.body;  // store raw body for Stripe signature
//     next();
//   },
//   stripeWebhooks
// );
app.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),  // REQUIRED
  stripeWebhooks
);

// ------------------------------
// BYPASS CLERK FOR WEBHOOKS
// ------------------------------
app.use((req, res, next) => {
  if (req.path === "/webhook/stripe") return next();
  return clerkMiddleware()(req, res, next);
});

// ------------------------------
// OTHER MIDDLEWARES
// ------------------------------
app.use(cors());
app.use(express.json()); // must be AFTER raw webhook middleware

// ------------------------------
// ROUTES
// ------------------------------
app.use("/api/educator", educatorRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

// ------------------------------
// SERVER
// ------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
