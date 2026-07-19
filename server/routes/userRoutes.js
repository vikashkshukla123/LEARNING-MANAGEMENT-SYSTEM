import express from "express";
import { requireAuth } from "@clerk/express";

import {
  addUserRating,
  getUserCourseProgress,
  getUserData,
  purchaseCourse,
  updateUserCourseProgress,
  userEnrolledCourses,
} from "../controllers/userController.js";

const userRouter = express.Router();

// User data
userRouter.get("/data", requireAuth(), getUserData);

// User enrolled courses
userRouter.get("/enrolled-courses", requireAuth(), userEnrolledCourses);

// Purchase course
userRouter.post("/purchase", requireAuth(), purchaseCourse);

// Update course progress
userRouter.post(
  "/update-course-progress",
  requireAuth(),
  updateUserCourseProgress
);

// Get course progress
userRouter.post(
  "/get-course-progress",
  requireAuth(),
  getUserCourseProgress
);

// Add rating
userRouter.post("/add-rating", requireAuth(), addUserRating);

export default userRouter;