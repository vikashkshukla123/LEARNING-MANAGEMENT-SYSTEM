// import React from 'react'
// import { assets } from '../../assets/assets'

// const CallToAction = () => {
//   return (
//     <div className='flex flex-cols items-center gap-4 pt-10 pb-24 md:px-0'>
//         <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn Anything, anytime, anywhere</h1>
//         <p className='text-gray-500 sm:text-sm'>Access world-class courses from any device, anytime. Empower your learning journey without boundaries.
//           Whether youre at home, on the go, or in class — gain new skills at your own pace with our flexible online
//            platform.
//         </p>
//         <div className='flex items-center font-medium gap-6 mt-4'>
//           <button className='px-10 py-3 rounded-md text-white bg-blue-600'>Get started</button>
//           <button className='flex items-center gap-2'>Learn More <img src={assets.arrow_icon} alt="arrow_icon" /></button>
//         </div>
//     </div>
//   )
// }

// export default CallToAction
import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center gap-6 py-20 px-6 md:px-20 bg-gray-50 rounded-2xl">
      <h1 className="text-2xl md:text-4xl text-gray-800 font-semibold max-w-2xl">
        Learn Anything, Anytime, Anywhere
      </h1>

      <p className="text-gray-600 text-sm md:text-base max-w-2xl leading-relaxed">
        Access world-class courses from any device, anytime. Empower your learning journey without boundaries. 
        Whether you’re at home, on the go, or in class — gain new skills at your own pace with our flexible online platform.
      </p>

      <div className="flex flex-wrap justify-center items-center font-medium gap-5 mt-4">
        <button className="px-8 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300">
          Get Started
        </button>
        <button className="flex items-center gap-2 text-blue-600 hover:underline">
          Learn More 
          <img className="w-4" src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  )
}

export default CallToAction
