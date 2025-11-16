// import React from 'react'
// import { assets, dummyTestimonial } from '../../assets/assets'

// const TestimonialsSection = () => {
//   return (
//     <div className='text-center pb-14 px-8 md:px-0'>
//         <h2 className='text-3xl font-medium textgray-800'>Testimonials</h2>
//         <p className='md:text-base text-gray-500 mt-3'>Hear from our learners as they share their journeys of 
//         transformation, success and how our <br /> platform has 
//         made a difference in their lives</p>
//         <div className='grid grid-cols-auto gap-8 mt-14'>
//           {dummyTestimonial.map((testimonial,index)=>(
//             <div className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px,4px,15px,0px] shadow-black/5 overflow-hidden' key={index}>
//               <div className='flex items-center gap-4 px-5 py-5 bg-gray-500/10'> 
//                 <img className= 'h-12 w-12 rounded-full'src={testimonial.image} alt={testimonial.name} />
//                 <div>
//                   <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
//                   <p className='text-gray-800/80'>{testimonial.role}</p>

//                   </div>
                  
//               </div>
//               <div className='p-5 pb-7'>
//                     <div className='flex gap-0.5'> 
//                       {[...Array(5)].map((_,i)=>(<img className='h-5' key={i} src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt="star"/>))}
//                     </div>
//                     <p className='text-gray-500 mt-5'>{testimonial.feedback}</p>

//                   </div>
//                   <a href="#" className='text-blue-500 underline px-5'> Read More</a>

//             </div>
//            ))}
//         </div>
        
//     </div>
//   )
// }

// export default TestimonialsSection

import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <div className="text-center pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3">
        Hear from our learners as they share their journeys of transformation, success, and how our <br />
        platform has made a difference in their lives
      </p>

      {/* Horizontal Scroll Row */}
      <div className="mt-14 flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="min-w-[300px] max-w-[300px] shrink-0 text-sm text-left border border-gray-300 rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">{testimonial.name}</h1>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between h-[220px]">
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      className="h-5"
                      src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                      alt="star"
                    />
                  ))}
                </div>
                <p className="text-gray-500 mt-4 line-clamp-4">{testimonial.feedback}</p>
              </div>
              <a href="#" className="text-blue-500 underline mt-4">Read More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection
