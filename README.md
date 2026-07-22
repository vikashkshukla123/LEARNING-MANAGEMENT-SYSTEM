# Learning Management System

A full-stack LMS where educators can create and sell courses, and students can browse, buy, and learn at their own pace. Built this as a way to get hands-on with real-world auth, payments, and file uploads instead of just another CRUD todo app.

**Live demo:** [Add your Vercel link here]

---

## What it does

- Students can browse courses, pay for them, and track their progress chapter by chapter
- Educators can flip a switch to become an educator, then create courses with chapters, lectures, and video links
- Payments go through Stripe, and enrollment happens automatically once a payment clears
- Everything's tied together with Clerk for auth, so there's no custom password/session handling to worry about
- Educators get a dashboard showing their total earnings, enrolled students, and course count

## Tech stack

**Frontend**
- React (Vite)
- Deployed on Vercel

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- Deployed on Render

**Third-party services**
- [Clerk](https://clerk.com) — authentication and user management
- [Stripe](https://stripe.com) — payments and checkout
- [Cloudinary](https://cloudinary.com) — course thumbnail storage

## How the pieces fit together

This part tripped me up a fair bit while building it, so here's the actual flow:

1. A user signs up through Clerk on the frontend.
2. Clerk fires a `user.created` webhook to the backend, which creates a matching `User` document in MongoDB (using the Clerk user ID as the Mongo `_id` — keeps things simple, no separate mapping table needed).
3. Any authenticated user can hit "become educator," which updates their `publicMetadata.role` in Clerk to `"educator"`.
4. Educators can create courses (with a Cloudinary-hosted thumbnail) through the Add Course page.
5. Students purchase a course through Stripe Checkout. On successful payment, Stripe fires a `checkout.session.completed` webhook, which:
   - marks the `Purchase` as `completed`
   - adds the course to the student's `enrolledCourses`
   - adds the student to the course's `enrolledStudents`
6. From there, students can track lecture-by-lecture progress, and educators can see real enrollment numbers on their dashboard.

Almost all of the "why isn't this working" moments during development came down to webhook misconfiguration — wrong endpoint URLs, wrong signing secrets, or subscribing to the wrong event type. If you're setting this up yourself, double- and triple-check that your Stripe and Clerk webhooks are pointed at the *deployed* backend URL (not localhost), and that the event types actually match what the code is listening for.

## Environment variables

**Backend (`.env`)**
```
MONGODB_URI=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_WEBHOOK_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
CURRENCY=usd
FRONTEND_URL=
PORT=5000
```

**Frontend (`.env`)**
```
VITE_CLERK_PUBLISHABLE_KEY=
VITE_BACKEND_URL=
```

Heads up: Clerk gives you different keys per project instance, and Stripe gives you a different webhook signing secret per endpoint. If you copy keys from an old test project or an old endpoint, everything will look "connected" but silently fail — auth will 401, or purchases will sit at "pending" forever with no obvious error.

## Running it locally

```bash
# clone it
git clone <your-repo-url>
cd <your-repo-name>

# backend
cd server
npm install
npm run dev

# frontend (in a new terminal)
cd client
npm install
npm run dev
```

You'll need to set up your webhooks to point at a publicly reachable URL for local testing — either deploy the backend first, or use a tunneling tool like [ngrok](https://ngrok.com) and register the tunnel URL as your webhook endpoint in both Clerk and Stripe.

## Testing payments

Use Stripe's test card, not a real one — test mode will always decline real cards:

```
Card number: 4242 4242 4242 4242
Expiry: any future date
CVC: any 3 digits
ZIP: any 5 digits
```

## Known limitations / things I'd improve

- No refund handling yet — `payment_intent.payment_failed` is logged but doesn't currently surface anything to the user
- Course progress is stored per lecture ID as a flat array; could be cleaner with a proper completion percentage field
- No email notifications on purchase or course completion
- Educator applications are self-serve (anyone can become an educator) — a review step would make more sense for a real product

## License

MIT — do whatever you want with it.
