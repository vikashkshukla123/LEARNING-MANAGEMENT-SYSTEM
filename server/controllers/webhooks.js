import { Webhook } from "svix";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Stripe from "stripe";
import Purchase from "../models/Purchase.js";

export const clerkWebhooks = async (req, res) => {
  console.log("Clerk webhook called");
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.create(userData);
        return res.status(200).json({ success: true });
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, updatedData);
        return res.status(200).json({ success: true });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(200).json({ received: true });
    }
  } catch (error) {
    console.error("Clerk webhook error:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  console.log("STRIPE WEBHOOK HIT");
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("STRIPE EVENT VERIFIED:", event.type);
  } catch (err) {
    console.error("Stripe signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("Payment Intent ID:", paymentIntent.id);

        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        if (!session.data.length) {
          console.error("No checkout session found for this payment intent");
          break;
        }

        const { purchaseId } = session.data[0].metadata;
        console.log("Purchase ID from metadata:", purchaseId);

        const purchaseData = await Purchase.findById(purchaseId);
        if (!purchaseData) {
          console.error("Purchase not found:", purchaseId);
          break;
        }

        const userData = await User.findById(purchaseData.userId);
        const courseData = await Course.findById(purchaseData.courseId);

        if (!userData || !courseData) {
          console.error("User or Course not found", {
            userFound: !!userData,
            courseFound: !!courseData,
          });
          break;
        }

        if (!courseData.enrolledStudents.some(id => id.toString() === userData._id.toString())) {
          courseData.enrolledStudents.push(userData._id);
          await courseData.save();
        }

        if (!userData.enrolledCourses.some(id => id.toString() === courseData._id.toString())) {
          userData.enrolledCourses.push(courseData._id);
          await userData.save();
        }

        purchaseData.status = "completed";
        await purchaseData.save();

        console.log("Enrollment completed successfully for user:", userData._id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        if (session.data.length) {
          const { purchaseId } = session.data[0].metadata;
          const purchaseData = await Purchase.findById(purchaseId);
          if (purchaseData) {
            purchaseData.status = "failed";
            await purchaseData.save();
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Error processing Stripe webhook:", error);
    return res.status(500).json({ received: false, error: error.message });
  }
};