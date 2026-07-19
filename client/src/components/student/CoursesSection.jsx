

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext)  // ✅ fixed destructuring

  return (
    <div className="py-16 px-8 md:px-40 flex flex-col items-center text-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
        Learn from the Best
      </h2>

      <p className="text-sm md:text-base text-gray-500 mt-4 max-w-2xl">
        Discover our top-rated courses across various categories. From coding and
        design to business and wellness, our courses are crafted to deliver real
        results.
      </p>

      {/* ✅ Responsive grid for course cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full">
        {allCourses?.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="mt-8 text-gray-600 border border-gray-400/40 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
      >
        Show All Courses
      </Link>
    </div>
  )
}

export default CoursesSection

