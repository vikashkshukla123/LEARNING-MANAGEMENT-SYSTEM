// import { Webhook } from "svix";
// import User from "../models/User.js";
// import Stripe from "stripe";
// import Purchase from "../models/Purchase.js";

// export const clerkWebhooks = async (req, res) => {
//   try {
//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     // Verify using raw body
//     wh.verify(req.rawBody, {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     });

//     const { data, type } = req.body;

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0].email_address,
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           imageUrl: data.image_url,
//         };

//         await User.create(userData);
//         return res.status(200).json({ success: true });
//       }

//       case "user.updated": {
//         const updatedData = {
//           email: data.email_addresses[0].email_address,
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           imageUrl: data.image_url,
//         };

//         await User.findByIdAndUpdate(data.id, updatedData);
//         return res.status(200).json({ success: true });
//       }

//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         return res.status(200).json({ success: true });
//       }

//       default:
//         return res.status(200).json({ received: true });
//     }
//   } catch (error) {
//     return res.status(400).json({ success: false, message: error.message });
//   }
// };

// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhooks = async (req, res) => {
//   const sig = req.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripeInstance.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   switch (event.type) {
//     case "payment_intent.succeeded": {
//       const paymentIntent = event.data.object;
//       const session = await stripeInstance.checkout.sessions.list({
//         payment_intent: paymentIntent.id,
//       });

//       const { purchaseId } = session.data[0].metadata;

//       const purchaseData = await Purchase.findById(purchaseId);
//       const userData = await User.findById(purchaseData.userId);
//       const courseData = await Course.findById(purchaseData.courseId);

//       courseData.enrolledStudents.push(userData._id);
//       await courseData.save();

//       userData.enrolledCourses.push(courseData._id);
//       await userData.save();

//       purchaseData.status = "completed";
//       await purchaseData.save();
//       break;
//     }

//     case "payment_intent.payment_failed": {
//       const paymentIntent = event.data.object;
//       const session = await stripeInstance.checkout.sessions.list({
//         payment_intent: paymentIntent.id,
//       });

//       const { purchaseId } = session.data[0].metadata;
//       const purchaseData = await Purchase.findById(purchaseId);

//       purchaseData.status = "failed";
//       await purchaseData.save();
//       break;
//     }

//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   return res.json({ received: true });
// };



import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";


// ----------------------
// CLERK WEBHOOK
// ----------------------
export const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify using raw body
    const evt = wh.verify(req.rawBody, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };

        await User.create(userData);
        return res.status(200).json({ success: true });
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses?.[0]?.email_address,
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
    return res.status(400).json({ success: false, message: error.message });
  }
};

// ----------------------
// STRIPE INSTANCE
// ----------------------


// ----------------------
// STRIPE WEBHOOK
// ----------------------
// ----------------------
// STRIPE WEBHOOK — FIXED
// ----------------------


export const stripeWebhooks = async (req, res) => {
  // Initialize Stripe INSIDE the function (fixes undefined key issue)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Stripe Webhook Signature Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;

      const sessionList = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      const metadata = sessionList.data[0].metadata;
      const purchaseId = metadata.purchaseId;

      const purchase = await Purchase.findById(purchaseId);
      const user = await User.findById(purchase.userId);
      const course = await Course.findById(purchase.courseId);

      // Add course to user
      user.enrolledCourses.push(course._id);
      await user.save();

      // Add user to course
      course.enrolledStudents.push(user._id);
      await course.save();

      // Mark purchase completed
      purchase.status = "completed";
      await purchase.save();
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;

      const sessionList = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      const purchaseId = sessionList.data[0].metadata.purchaseId;
      const purchase = await Purchase.findById(purchaseId);

      purchase.status = "failed";
      await purchase.save();
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return res.json({ received: true });
};
