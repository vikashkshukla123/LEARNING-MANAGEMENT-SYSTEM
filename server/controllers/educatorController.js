



import { clerkClient ,getAuth } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

// Make sure Cloudinary is configured before using
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});



export const updateRoleEducator = async (req, res) => {
  try {
    const auth = getAuth(req);

    console.log("AUTH OBJECT:", auth);

    if (!auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    console.log("USER ID:", auth.userId);

    await clerkClient.users.updateUserMetadata(auth.userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    return res.json({
      success: true,
      message: "You can publish a course now",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addCourse = async (req, res) => {
  try {
    const educatorId = req.user?.id || req.auth?.userId;

    console.log("Educator ID:", educatorId);
    console.log("Request file:", req.file);
    console.log("Request body:", req.body);

    if (!educatorId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "Thumbnail image is required" });

    if (!req.body.courseData)
      return res
        .status(400)
        .json({ success: false, message: "Course data is required" });

    // Parse incoming JSON
    let parsedData = JSON.parse(req.body.courseData);

    
    parsedData.courseContent = parsedData.courseContent.map(
      (chapter, chapterIndex) => ({
        chapterId: chapter.id, // frontend sends id
        chapterOrder: chapterIndex + 1,
        chapterTitle: chapter.chapterTitle,

        chapterContent: chapter.chapterContent.map(
          (lecture, lectureIndex) => ({
            lectureId: lecture.id, // frontend sends id
            lectureTitle: lecture.lectureTitle,
            lectureDuration: Number(lecture.lectureDuration),
            lectureUrl: lecture.lectureUrl,
            isPreviewFree: lecture.isPreviewFree,
            lectureOrder: lectureIndex + 1,
          })
        ),
      })
    );

    // Add educator
    parsedData.educator = educatorId;

    // Upload image to cloudinary
    const uploadedImg = await cloudinary.uploader.upload(req.file.path, {
      folder: "courses",
    });

    parsedData.courseThumbnail = uploadedImg.secure_url;

    // Now save corrected data
    const newCourse = await Course.create(parsedData);

    res.status(201).json({
      success: true,
      message: "Course added successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("addCourse Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================
// Get educator courses
// ==========================
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.user?.id || req.auth?.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    console.error("getEducatorCourses Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================
// Educator dashboard data
// ==========================
export const educatorDashboardData = async (req, res) => {
  console.log("🔥 educatorDashboardData reached");
  try {
    const educator = req.user?.id || req.auth?.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find({ _id: { $in: course.enrolledStudents } }, "name imageUrl");
      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({ success: true, dashboardData: { totalEarnings, enrolledStudentsData, totalCourses } });
  } catch (error) {
    console.error("educatorDashboardData Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================
// Get enrolled students with purchase info
// ==========================
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.user?.id || req.auth?.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    console.error("getEnrolledStudentsData Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
