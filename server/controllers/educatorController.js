// import { clerkClient } from "@clerk/express";
// import { v2 as cloudinary } from "cloudinary";
// import Course from "../models/Course.js";
// import Purchase from "../models/Purchase.js";
// import User from "../models/User.js";

// // Update role to educator
// export const updateRoleEducator = async (req, res) => {
//   try {
//     const userId = req.auth.userId;

//     await clerkClient.users.updateUserMetadata(userId, {
//       publicMetadata: {
//         role: "educator",
//       },
//     });

//     res.json({ success: true, message: "You can publish a course now" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Add new course
// export const addCourse = async (req, res) => {
//   try {
//     const { courseData } = req.body;
//     const imageFile = req.file;
//     const educatorId = req.auth.userId;

//     if (!imageFile) {
//       return res.json({ success: false, message: "Thumbnail Not Attached" });
//     }

//     let parsedCourseData;
//     try {
//       parsedCourseData = JSON.parse(courseData);
//     } catch (err) {
//       return res.json({ success: false, message: "Invalid courseData JSON" });
//     }

//     parsedCourseData.educator = educatorId;

//     const uploadedImg = await cloudinary.uploader.upload(imageFile.path);
//     parsedCourseData.courseThumbnail = uploadedImg.secure_url;

//     await Course.create(parsedCourseData);

//     res.json({ success: true, message: "Course Added" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Get educator courses
// export const getEducatorCourses = async (req, res) => {
//   try {
//     const educator = req.auth.userId;
//     const courses = await Course.find({ educator });
//     res.json({ success: true, courses });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Educator dashboard data
// export const educatorDashboardData = async (req, res) => {
//   try {
//     const educator = req.auth.userId;
//     const courses = await Course.find({ educator });
//     const totalCourses = courses.length;

//     const courseIds = courses.map(course => course._id);

//     // Calculate total earnings from completed purchases
//     const purchases = await Purchase.find({
//       courseId: { $in: courseIds },
//       status: "completed",
//     });

//     const totalEarnings = purchases.reduce(
//       (sum, purchase) => sum + purchase.amount,
//       0
//     );

//     // Collect unique enrolled students with course info
//     const enrolledStudentsData = [];
//     for (const course of courses) {
//       const students = await User.find(
//         { _id: { $in: course.enrolledStudents } },
//         "name imageUrl"
//       );
//       students.forEach(student => {
//         enrolledStudentsData.push({
//           courseTitle: course.courseTitle,
//           student,
//         });
//       });
//     }

//     res.json({
//       success: true,
//       dashboardData: { totalEarnings, enrolledStudentsData, totalCourses },
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Get enrolled students data with purchase info
// export const getEnrolledStudentsData = async (req, res) => {
//   try {
//     const educator = req.auth.userId;
//     const courses = await Course.find({ educator });
//     const courseIds = courses.map(course => course._id);

//     const purchases = await Purchase.find({
//       courseId: { $in: courseIds },
//       status: "completed",
//     })
//       .populate("userId", "name imageUrl")
//       .populate("courseId", "courseTitle");

//     const enrolledStudents = purchases.map(purchase => ({
//       student: purchase.userId,
//       courseTitle: purchase.courseId.courseTitle,
//       purchaseDate: purchase.createdAt,
//     }));

//     res.json({ success: true, enrolledStudents });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// import { clerkClient } from "@clerk/express";
// import { v2 as cloudinary } from "cloudinary";
// import Course from "../models/Course.js";
// import Purchase from "../models/Purchase.js";
// import User from "../models/User.js";

// // Update role to educator
// export const updateRoleEducator = async (req, res) => {
//   try {
//     const userId = req.user?.id || req.auth?.userId;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     await clerkClient.users.updateUserMetadata(userId, {
//       publicMetadata: {
//         role: "educator",
//       },
//     });

//     res.json({ success: true, message: "You can publish a course now" });
//   } catch (error) {
//     console.error("updateRoleEducator error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Add new course
// export const addCourse = async (req, res) => {
//   try {
//     const educatorId = req.user?.id || req.auth?.userId;

//     if (!educatorId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "Thumbnail image is required" });
//     }

//     if (!req.body.courseData) {
//       return res.status(400).json({ success: false, message: "Course data is required" });
//     }

//     let parsedCourseData;
//     try {
//       parsedCourseData = JSON.parse(req.body.courseData);
//     } catch (err) {
//       return res.status(400).json({ success: false, message: "Invalid JSON in courseData" });
//     }

//     parsedCourseData.educator = educatorId;

//     // Upload thumbnail to Cloudinary
//     const uploadedImg = await cloudinary.uploader.upload(req.file.path, {
//       folder: "courses",
//     });
//     parsedCourseData.courseThumbnail = uploadedImg.secure_url;

//     const newCourse = await Course.create(parsedCourseData);

//     res.status(201).json({ success: true, message: "Course added successfully", course: newCourse });
//   } catch (error) {
//     console.error("addCourse error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get educator courses
// export const getEducatorCourses = async (req, res) => {
//   try {
// //     const educator = req.user?.id || req.auth?.userId;
// //     const courses = await Course.find({ educator });
// //     res.json({ success: true, courses });
// //   } catch (error) {
// //     console.error("getEducatorCourses error:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Educator dashboard data
// // export const educatorDashboardData = async (req, res) => {
// //   try {
// //     const educator = req.user?.id || req.auth?.userId;
// //     const courses = await Course.find({ educator });
// //     const totalCourses = courses.length;

// //     const courseIds = courses.map(course => course._id);

// //     const purchases = await Purchase.find({
// //       courseId: { $in: courseIds },
// //       status: "completed",
// //     });

// //     const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

// //     const enrolledStudentsData = [];
// //     for (const course of courses) {
// //       const students = await User.find(
// //         { _id: { $in: course.enrolledStudents } },
// //         "name imageUrl"
// //       );
// //       students.forEach(student => {
// //         enrolledStudentsData.push({
// //           courseTitle: course.courseTitle,
// //           student,
// //         });
// //       });
// //     }

// //     res.json({
// //       success: true,
// //       dashboardData: { totalEarnings, enrolledStudentsData, totalCourses },
// //     });
// //   } catch (error) {
// //     console.error("educatorDashboardData error:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Get enrolled students with purchase info
// // export const getEnrolledStudentsData = async (req, res) => {
// //   try {
// //     const educator = req.user?.id || req.auth?.userId;
// //     const courses = await Course.find({ educator });
// //     const courseIds = courses.map(course => course._id);

// //     const purchases = await Purchase.find({
// //       courseId: { $in: courseIds },
// //       status: "completed",
// //     })
// //       .populate("userId", "name imageUrl")
// //       .populate("courseId", "courseTitle");

// //     const enrolledStudents = purchases.map(purchase => ({
// //       student: purchase.userId,
// //       courseTitle: purchase.courseId.courseTitle,
// //       purchaseDate: purchase.createdAt,
// //     }));

// //     res.json({ success: true, enrolledStudents });
// //   } catch (error) {
// //     console.error("getEnrolledStudentsData error:", error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };


// import { clerkClient } from "@clerk/express";
// import { v2 as cloudinary } from "cloudinary";
// import path from "path";
// import Course from "../models/Course.js";
// import Purchase from "../models/Purchase.js";
// import User from "../models/User.js";

// // Update role to educator
// export const updateRoleEducator = async (req, res) => {
//   try {
//     const userId = req.auth?.userId;
//     if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

//     await clerkClient.users.updateUserMetadata(userId, {
//       publicMetadata: { role: "educator" },
//     });

//     res.json({ success: true, message: "You can publish a course now" });
//   } catch (error) {
//     console.error("updateRoleEducator error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Add new course
// export const addCourse = async (req, res) => {
//   try {
//     const educatorId = req.auth?.userId;
//     if (!educatorId) return res.status(401).json({ success: false, message: "Unauthorized" });

//     if (!req.file) return res.status(400).json({ success: false, message: "Thumbnail image is required" });
//     if (!req.body.courseData) return res.status(400).json({ success: false, message: "Course data is required" });

//     let parsedCourseData;
//     try {
//       parsedCourseData = JSON.parse(req.body.courseData);
//     } catch {
//       return res.status(400).json({ success: false, message: "Invalid JSON in courseData" });
//     }

//     parsedCourseData.educator = educatorId;

//     // Upload to Cloudinary
//     const uploadedImg = await cloudinary.uploader.upload(path.resolve(req.file.path), { folder: "courses" });
//     parsedCourseData.courseThumbnail = uploadedImg.secure_url;

//     const newCourse = await Course.create(parsedCourseData);

//     res.status(201).json({ success: true, message: "Course added successfully", course: newCourse });
//   } catch (error) {
//     console.error("addCourse error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get educator courses
// export const getEducatorCourses = async (req, res) => {
//   try {
//     const educator = req.auth?.userId;
//     const courses = await Course.find({ educator });
//     res.json({ success: true, courses });
//   } catch (error) {
//     console.error("getEducatorCourses error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Educator dashboard
// export const educatorDashboardData = async (req, res) => {
//   try {
//     const educator = req.auth?.userId;
//     const courses = await Course.find({ educator });
//     const totalCourses = courses.length;
//     const courseIds = courses.map(c => c._id);

//     const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: "completed" });
//     const totalEarnings = purchases.reduce((sum, p) => sum + p.amount, 0);

//     const enrolledStudentsData = [];
//     for (const course of courses) {
//       const students = await User.find({ _id: { $in: course.enrolledStudents } }, "name imageUrl");
//       students.forEach(student => enrolledStudentsData.push({ courseTitle: course.courseTitle, student }));
//     }

//     res.json({ success: true, dashboardData: { totalEarnings, enrolledStudentsData, totalCourses } });
//   } catch (error) {
//     console.error("educatorDashboardData error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get enrolled students with purchase info
// export const getEnrolledStudentsData = async (req, res) => {
//   try {
//     const educator = req.auth?.userId;
//     const courses = await Course.find({ educator });
//     const courseIds = courses.map(c => c._id);

//     const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: "completed" })
//       .populate("userId", "name imageUrl")
//       .populate("courseId", "courseTitle");

//     const enrolledStudents = purchases.map(p => ({
//       student: p.userId,
//       courseTitle: p.courseId.courseTitle,
//       purchaseDate: p.createdAt,
//     }));

//     res.json({ success: true, enrolledStudents });
//   } catch (error) {
//     console.error("getEnrolledStudentsData error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



import { clerkClient } from "@clerk/express";
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

// ==========================
// Update role to educator
// ==========================
// export const updateRoleEducator = async (req, res) => {
//   try {
//     const userId = req.user?.id || req.auth?.userId;
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     await clerkClient.users.updateUserMetadata(userId, {
//       publicMetadata: { role: "educator" },
//     });

//     res.json({ success: true, message: "You can publish a course now" });
//   } catch (error) {
//     console.error("updateRoleEducator Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
export const updateRoleEducator = async (req, res) => {
  try {
    console.log("===== updateRoleEducator =====");
    console.log("Authorization:", req.headers.authorization);
    console.log("req.auth:", req.auth);
    console.log("req.user:", req.user);

    const userId = req.user?.id || req.auth?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: "educator" },
    });

    res.json({
      success: true,
      message: "You can publish a course now",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================
// Add new course
// ==========================
// export const addCourse = async (req, res) => {
//   try {
//     const educatorId = req.user?.id || req.auth?.userId;

//     console.log("Educator ID:", educatorId);
//     console.log("Request file:", req.file);
//     console.log("Request body:", req.body);

//     if (!educatorId) return res.status(401).json({ success: false, message: "Unauthorized" });
//     if (!req.file) return res.status(400).json({ success: false, message: "Thumbnail image is required" });
//     if (!req.body.courseData) return res.status(400).json({ success: false, message: "Course data is required" });

//     let parsedCourseData;
//     try {
//       parsedCourseData = JSON.parse(req.body.courseData);
//     } catch (err) {
//       return res.status(400).json({ success: false, message: "Invalid JSON in courseData" });
//     }

//     parsedCourseData.educator = educatorId;

//     // Upload thumbnail to Cloudinary
//     const uploadedImg = await cloudinary.uploader.upload(req.file.path, { folder: "courses" });
//     parsedCourseData.courseThumbnail = uploadedImg.secure_url;

//     const newCourse = await Course.create(parsedCourseData);

//     res.status(201).json({ success: true, message: "Course added successfully", course: newCourse });
//   } catch (error) {
//     console.error("addCourse Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



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
