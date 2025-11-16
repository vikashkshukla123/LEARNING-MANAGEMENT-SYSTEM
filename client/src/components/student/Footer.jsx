// import React from 'react'
// import { assets } from '../../assets/assets'

// const Footer = () => {
//   return (
//     <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
//       <div className='flex flex-cols md:flex-row items-start px-8 md:px-0 justify-center gap-10
//       md:gap-32 py-10 border-b border-white/30'>
//         <div className='flex flex-cols md:items-start items-center w-full'>
//           <img src={assets.logo_dark} alt="logo" />
//           <p className='mt-6 text-center md:text-left text-sm text-white/80'>Our Learning Management System empowers students and professionals
//              to achieve their goals through accessible, engaging, and high-quality online learning.
//               From interactive lessons to expert-led courses, we bring knowledge to your fingertips — anytime,
//            anywhere.</p>

//         </div>
//         <div className='flex flex-cols md:items-start items-center w-full'>
//           <h2 className='font-semibold text-white mb-5'>Company</h2>
//           <ul className='flex md:flex-cols w-full justify-between text-sm text-white/80 md:space-y-2'>
//             <li><a href="#">Home</a></li>
//             <li><a href="#">About us</a></li>
//             <li><a href="#">Contact us</a></li>
//             <li><a href="#">Privacy policy</a></li>
//             <li><a href="#">Privacy policy</a></li>

//           </ul>

//         </div>
//         <div className='hidden md:flex flex-cols items-start w-full'>
//           <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
//           <p className='text-sm text-white/80'>The latest news, articles and resources,sent to your inbox weekly.</p>
//           <div className='flex items-center gap-2 pt-4'>
//             <input type="email" placeholder='Enter your email' className='border border-gray-500/30 bg-gray-800
//             text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm' />
//             <button className='bg-blue-600 w-24 h-9 text-white rounded'>Subscribe</button>
//           </div>

//         </div>

//       </div>
//         <p className='py-4 text-center text-xs md:text-sm text-white/60'>
//           Copyright 2025 @ GreatStack. All rights Reserved.

//         </p>
//     </footer>
//   )
// }

// export default Footer
import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-left w-full mt-10 md:px-36">
      {/* Main footer content */}
      <div className="flex flex-col md:flex-row items-start justify-center gap-10 md:gap-32 px-8 md:px-0 py-10 border-b border-white/30">

        {/* About section */}
        <div className="flex flex-col items-center md:items-start w-full">
          <img src={assets.logo_dark} alt="logo" className="w-32 md:w-40" />
          <p className="mt-6 text-sm text-white/80 text-center md:text-left leading-relaxed">
            Our Learning Management System empowers students and professionals to achieve their goals through
            accessible, engaging, and high-quality online learning. From interactive lessons to expert-led
            courses, we bring knowledge to your fingertips — anytime, anywhere.
          </p>
        </div>

        {/* Company links */}
        <div className="flex flex-col items-center md:items-start w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex flex-col md:space-y-2 text-sm text-white/80 space-y-2 md:space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            The latest news, articles, and resources — sent to your inbox weekly.
          </p>
          <div className="flex items-center gap-2 pt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-500 outline-none w-64 h-9 rounded px-3 text-sm focus:border-blue-500 transition-all"
            />
            <button className="bg-blue-600 hover:bg-blue-700 transition-all w-24 h-9 text-white rounded text-sm">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Footer bottom text */}
      <p className="py-4 text-center text-xs md:text-sm text-white/60 border-t border-white/10">
        © 2025 GreatStack. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
