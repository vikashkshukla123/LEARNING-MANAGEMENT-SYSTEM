

import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../../components/student/Loading";
import { useUser } from "@clerk/clerk-react";

const Player = () => {
  const { user } = useUser(); // ✅ FIXED: Get logged-in user

  const {
    enrolledCourses,
    calculateChapterTime,
    backendUrl,
    getToken,
    fetchUserEnrolledCourses,
  } = useContext(AppContext);

  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getYouTubeVideoId = (url) => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      // https://youtu.be/VIDEO_ID
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      }

      // https://www.youtube.com/watch?v=VIDEO_ID
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) return videoId;

      // https://www.youtube.com/embed/VIDEO_ID
      if (parsedUrl.pathname.includes("/embed/")) {
        return parsedUrl.pathname.split("/embed/")[1];
      }

      // https://www.youtube.com/shorts/VIDEO_ID
      if (parsedUrl.pathname.includes("/shorts/")) {
        return parsedUrl.pathname.split("/shorts/")[1];
      }
    } catch (error) {
      console.error("Invalid YouTube URL:", url);
    }

    return "";
  };

  // -------------------------------
  // Get Course Data
  // -------------------------------
  const getCourseData = () => {
    const course = enrolledCourses.find((c) => c._id === courseId);

    if (course) {
      setCourseData(course);

      // Find logged-in user's rating
      const userRating = course.courseRatings.find(
        (rating) => rating.userId === user.id
      );
      if (userRating) setInitialRating(userRating.rating);
    }
  };

  // -------------------------------
  // Toggle Chapter Section
  // -------------------------------
  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // -------------------------------
  // Mark Lecture as Completed
  // -------------------------------
  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/update-course-progress",
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // -------------------------------
  // Fetch Course Progress
  // -------------------------------
  // const getCourseProgress = async () => {
  //   try {
  //     const token = await getToken();

  //     const { data } = await axios.post(
  //       backendUrl + "/api/user/get-course-progress",
  //       { courseId },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (data.success) {
  //       setProgressData(data.progressData);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };
  const getCourseProgress = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/get-course-progress",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("API Response:", data);

      if (data.success) {
        console.log("Progress Data:", data.progressData);
        console.log("API Response:", data);
        console.log("Progress Data:", data.progressData);
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  // -------------------------------
  // Handle Rating
  // -------------------------------
  const handleRate = async (rating) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/add-rating",
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserEnrolledCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // -------------------------------
  // Effects
  // -------------------------------
  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses]);

  useEffect(() => {
    getCourseProgress();
  }, []);

  // -------------------------------
  // RENDER
  // -------------------------------
  return courseData ? (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">

        {/* LEFT COLUMN */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <div className="pt-5">
            {courseData.courseContent.map((chapter, chapterIndex) => (
              <div
                key={chapterIndex}
                className="border border-gray-300 bg-white mb-2 rounded"
              >
                {/* Chapter Header */}
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  onClick={() => toggleSection(chapterIndex)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      className={`transform transition-transform ${openSections[chapterIndex] ? "rotate-180" : ""
                        }`}
                      src={assets.down_arrow_icon}
                      alt="arrow icon"
                    />
                    <p className="font-medium md:text-base text-sm">
                      {chapter.chapterTitle}
                    </p>
                  </div>

                  <p className="text-sm md:text-default">
                    {chapter.chapterContent.length} lectures -{" "}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>

                {/* Lectures */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${openSections[chapterIndex] ? "max-h-96" : "max-h-0"
                    }`}
                >
                  <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                      <li key={lectureIndex} className="flex items-start gap-2 py-1">
                        <img
                          src={
                            progressData &&
                              progressData.lectureCompleted.includes(
                                lecture.lectureId
                              )
                              ? assets.blue_tick_icon
                              : assets.play_icon
                          }
                          alt="play icon"
                          className="w-4 h-4 mt-1"
                        />

                        <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                          <p>{lecture.lectureTitle}</p>

                          <div className="flex gap-2">
                            {lecture.lectureUrl && (
                              <p
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: chapterIndex + 1,
                                    lecture: lectureIndex + 1,
                                  })
                                }
                                className="text-blue-500 cursor-pointer"
                              >
                                Watch
                              </p>
                            )}

                            <p>
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                { units: ["h", "m"] }
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this course:</h1>
            <Rating initialRating={initialRating} onRate={handleRate} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <iframe
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  playerData.lectureUrl
                )}`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div className="flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>

                <button
                  onClick={() =>
                    markLectureAsCompleted(playerData.lectureId)
                  }
                  className="text-blue-600"
                >
                  {progressData &&
                    progressData.lectureCompleted.includes(
                      playerData.lectureId
                    )
                    ? "Completed"
                    : "Mark Complete"}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt=""
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Player;
