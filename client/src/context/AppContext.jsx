// import { createContext, useEffect, useState } from "react";
// import { dummyCourses } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import humanizeDuration from 'humanize-duration'
// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
//   const currency = import.meta.env.VITE_CURRENCY;
//   const navigate = useNavigate()

//   const [allCourses, setAllCourses] = useState([]);
//   const [isEducator, setIsEducator] = useState(true);

//   // fetch all courses
//   const fetchAllCourses = async () => {
//     setAllCourses(dummyCourses);
//   };

//   // function to calculate average rating of courses
//   const calculateRating = (course) => {
//     if(course.courseRatings.length === 0){
//       return 0;
//     }
//     let totalRating = 0;
//     course.courseRatings.forEach(rating => {
//       totalRating += rating.rating
//     })
//     return totalRating / course.courseRatings.length

//   }
//   // function to calculate course chapter time
//   const calculateChapterTime = (chapter)=>{
//     let time = 0
//     chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
//     return humanizeDuration(time * 60 * 1000, {units:["h","m"]})

//   }

//   // function to calculate the total duration
//   const calculateCourseDuration = ()=>{
//     let time = 0;
//     course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration
//     ))
//     return humanizeDuration(time * 60 * 1000, {units:["h","m"]})
//   }

//   // function to calculate the number of lecture in the course
//   const calculateNoOfLectures = (course)=>{
//     let totalLectures = 0;
//     course.courseContent.forEach(chapter => {
//       if(Array.isArray(chapter.chapterContent)){
//         totalLectures += chapter.chapterContent.length
//       }
//     });
//     return totalLectures;

//   }

//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   const value = {
//     currency,
//     allCourses,
//     navigate,
//     calculateRating,
//     isEducator,setIsEducator,
//     calculateNoOfLectures,calculateCourseDuration,calculateChapterTime
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };
import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { data, useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import{useAuth,useUser} from "@clerk/clerk-react"
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const {getToken} = useAuth()
  const {user} = useUser()

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);

  // Fetch all courses
  // Fetch all courses
const fetchAllCourses = async () => {
  try {
    const res = await axios.get(backendUrl + "/api/course/all");

    if (res.data.success) {
      setAllCourses(res.data.courses);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

// fetch user data
const fetchUserData = async()=>{
  if(user.publicMetadata.role === 'educator'){
    setIsEducator(true)
  }
  try {
    const token = await getToken();
    const {data} = await axios.get(backendUrl + '/api/user/data', {headers : {Authorization : `Bearer ${token}`}})
    if(data.success){
      setUserData(data.user)
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
    
  }
}


  // Calculate average rating
  const calculateRating = (course) => {
    if (!course?.courseRatings?.length) return 0;

    const total = course.courseRatings.reduce(
      (sum, r) => sum + r.rating,
      0
    );

    return Math.floor(total / course.courseRatings.length)
  };

  // Calculate total time of a chapter
  const calculateChapterTime = (chapter) => {
    if (!chapter?.chapterContent) return "0m";

    const minutes = chapter.chapterContent.reduce(
      (sum, lecture) => sum + lecture.lectureDuration,
      0
    );

    return humanizeDuration(minutes * 60 * 1000, {
      units: ["h", "m"],
      round: true,
    });
  };

  // Calculate total course duration
  const calculateCourseDuration = (course) => {
    if (!course?.courseContent) return "0m";

    let minutes = 0;

    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lec) => {
        minutes += lec.lectureDuration;
      });
    });

    return humanizeDuration(minutes * 60 * 1000, {
      units: ["h", "m"],
      round: true,
    });
  };

  // Count lectures in a course
  const calculateNoOfLectures = (course) => {
    if (!course?.courseContent) return 0;

    return course.courseContent.reduce((count, chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        return count + chapter.chapterContent.length;
      }
      return count;
    }, 0);
  };

  // fetch user enrolled courses
  const fetchUserEnrolledCourses = async()=>{
    try {
       const token = await getToken();
    const {data} = await axios.get(backendUrl + '/api/user/enrolled-courses', {headers : {Authorization : `Bearer ${token}`}})
    if(data.success){
      setEnrolledCourses(data.enrolledCourses.reverse())
    }else{
      toast.error(data.message)
    }
      
    } catch (error) {
      toast.error(error.message)
      
    }
   
  }

  // Load data on mount
  useEffect(() => {
    fetchAllCourses();
   
  }, []);
   
  const logToken = async ()=>{
    console.log(await getToken());
  }
  useEffect(()=>{
    if(user){
      fetchUserData()
       fetchUserEnrolledCourses()

    }

  },[user])

  const value = {
    currency,
    navigate,
    allCourses,
    isEducator,
    setIsEducator,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,
    backendUrl,userData, setUserData, getToken, fetchAllCourses
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
