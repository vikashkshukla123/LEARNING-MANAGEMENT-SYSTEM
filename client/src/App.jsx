import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen bg-white'>
      <ToastContainer />
      {!isEducatorRoute && <Navbar/>}
      
      <Routes>
        {/* Student Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />

        {/* Educator Routes */}
        <Route path='/educator' element={<Educator />}>
          <Route path='/educator' element={<Dashboard />} /> {/* Default route inside /educator */}
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='students-enrolled' element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App


// import React, { useState } from 'react';
// import axios from 'axios';

// const AddCourse = () => {
//   const [courseTitle, setCourseTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!courseTitle || !description || !price || !image) {
//       setMessage("Please fill all fields and attach an image");
//       return;
//     }

//     setLoading(true);
//     setMessage('');

//     try {
//       // Prepare courseData JSON
//       const courseData = {
//         courseTitle,
//         description,
//         price: parseFloat(price),
//       };

//       // Create FormData
//       const formData = new FormData();
//       formData.append('image', image);
//       formData.append('courseData', JSON.stringify(courseData));

//       // Make request
//       const response = await axios.post(
//         'http://localhost:5000/api/educator/add-course',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           withCredentials: true, // if using cookies / Clerk auth
//         }
//       );

//       if (response.data.success) {
//         setMessage(response.data.message);
//         // Reset form
//         setCourseTitle('');
//         setDescription('');
//         setPrice('');
//         setImage(null);
//       } else {
//         setMessage(response.data.message || "Error adding course");
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage(error.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-course-form">
//       <h2>Add Course</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Course Title"
//           value={courseTitle}
//           onChange={(e) => setCourseTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Uploading...' : 'Add Course'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCourse;
