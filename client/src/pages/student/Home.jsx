import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection';
import TestimonialsSection from '../../components/student/TestimonialsSection';
import CallToAction from '../../components/student/CallToAction';
import Footer from '../../components/student/Footer';

// import other components as needed...

const Home = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      {/* Each child below will appear one after another vertically */}
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonialsSection/>
      <CallToAction/>
      <Footer/>
      {/* Add more components below */}
    </div>
  )
}

export default Home
