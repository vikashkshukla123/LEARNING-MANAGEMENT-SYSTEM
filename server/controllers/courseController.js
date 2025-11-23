
// import Course from '../models/Course.js'




// // get all courses
// export const getAllCourse = async (req,res)=>{
//     try {
//         const courses = await Course.find({isPublished : true}).select(['-courseContent','-enrolledStudents']).populate({path:'educator'})
//         res.json({success : true,courses})

        
//     } catch (error) {
//         res.json({success : false, message : error.message})
        
//     }

// }


// // get course by id

// export const getCourseId = async (req,res) => {
//     const {id} = req.params
//     try {
//         const courseData = await Course.findById(id).populate({path : 'educator'})
//         // remove lecture url if ifpreview is false
//         courseData.courseContent.forEach(chapter => {
//             chapter.chapterContent.forEach(lecture => {
//                 if(!lecture.isPreviewFree){
//                     lecture.lectureUrl = "";
//                 }
//             })
//         })
//         res.json({success : true , courseData})

        
//     } catch (error) {
//         res.json({success : false, message : error.message})
        
//     }
// }


import Course from "../models/Course.js";

// ===========================
// GET ALL COURSES (PUBLIC)
// ===========================
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ===========================
// GET COURSE BY ID
// ===========================
export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const courseData = await Course.findById(id);

    if (!courseData) {
      return res.json({ success: false, message: "Course not found" });
    }

    // Remove lecture URL if lecture is not preview free
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });

    res.json({ success: true, courseData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
