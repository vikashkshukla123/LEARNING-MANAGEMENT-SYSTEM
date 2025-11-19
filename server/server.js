// MUST BE FIRST LINE — BEFORE ANY OTHER IMPORT
import dotenv from "dotenv";
dotenv.config();

// AFTER DOTENV — NOW IMPORT EVERYTHING
import express from 'express';
import cors from 'cors';

import connectDB from './configs/mongodb.js';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';


// initialize express
const app = express()

// CONNECT TO DATABASE
await connectDB()
await connectCloudinary()

// middlewares
app.use(cors())
app.use(clerkMiddleware())

// ❌ IMPORTANT: Do NOT use express.json() before webhooks
// It will break signature verification.

// Test route
app.get('/', (req, res) => res.send("API Working"))

// ------------------------
// ✅ Clerk Webhook (RAW BODY REQUIRED)
// ------------------------
app.post(
  '/clerk',
  express.raw({ type: 'application/json' }),
  clerkWebhooks
);

// ------------------------
// Normal JSON routes
// ------------------------
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)

// ------------------------
// ✅ Stripe Webhook (RAW BODY REQUIRED)
// ------------------------
app.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  stripeWebhooks
);

// port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
