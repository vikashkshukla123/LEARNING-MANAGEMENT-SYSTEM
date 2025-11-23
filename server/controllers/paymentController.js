// controllers/paymentController.js
import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,

      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const purchaseId = session.metadata.purchaseId;

    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return res.json({ success: false });
    }

    // Mark purchase completed
    purchase.status = "completed";
    await purchase.save();

    // Add course to user.enrolledCourses
    await User.findByIdAndUpdate(purchase.userId, {
      $addToSet: { enrolledCourses: purchase.courseId },
    });

    // Add user to course.enrolledStudents
    await Course.findByIdAndUpdate(purchase.courseId, {
      $addToSet: { enrolledStudents: purchase.userId },
    });

    console.log("🎉 Purchase completed — user enrolled!");
  }

  res.json({ received: true });
};
