// import React from 'react'
// import { assets } from '../../assets/assets'

// const SearchBar = () => {
//   return (
    
//         <form className='mx-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded'>
//           <img src={assets.search_icon} alt="search_icon" className='md:w-auto w-10 px-3' />
//           <input type="text" placeholder='Search for courses' className='w-full h-full outilne-none text-gray-500/80' />
//           <button type='submit' className='bg-blue-600 rounded text-white md:px-10 px-7 md:py3 py-2 mx-1'>Search</button>
//         </form>
//   )
// }

// export default SearchBar 


// import React from 'react'
// import { assets } from '../../assets/assets'

// const SearchBar = () => {
//   return (
//     <form
//       className="w-full max-w-md md:h-14 h-12 flex items-center justify-between bg-white border border-gray-300 rounded-xl shadow-sm mx-auto"
//     >
//       <img
//         src={assets.search_icon}
//         alt="search_icon"
//         className="w-5 md:w-6 ml-3 opacity-60"
//       />
//       <input
//         type="text"
//         placeholder="Search for courses..."
//         className="flex-1 h-full px-3 text-gray-600 placeholder-gray-400 focus:outline-none text-sm md:text-base"
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-r-xl text-white md:px-6 px-4 h-full text-sm md:text-base"
//       >
//         Search
//       </button>
//     </form>
//   )
// }

// export default SearchBar

// import React, { useState, useContext } from 'react'
// import { AppContext } from '../../context/AppContext'
// import { assets } from '../../assets/assets'

// const SearchBar = () => {
//   const { navigate } = useContext(AppContext)
//   const [text, setText] = useState('')

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (text.trim() !== '') {
//       navigate(`/courses/${text.trim()}`)
//     } else {
//       navigate('/courses')
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-md md:h-14 h-12 flex items-center justify-between bg-white border border-gray-300 rounded-xl shadow-sm mx-auto"
//     >
//       <img
//         src={assets.search_icon}
//         alt="search_icon"
//         className="w-5 md:w-6 ml-3 opacity-60"
//       />

//       <input
//         type="text"
//         placeholder="Search for courses..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="flex-1 h-full px-3 text-gray-600 placeholder-gray-400 focus:outline-none text-sm md:text-base"
//       />

//       <button
//         type="submit"
//         className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-r-xl text-white md:px-6 px-4 h-full text-sm md:text-base"
//       >
//         Search
//       </button>
//     </form>
//   )
// }

// export default SearchBar


import React, { useState, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const SearchBar = () => {
  const { navigate } = useContext(AppContext)
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text.trim()) {
      navigate(`/course-list/${text.trim()}`)
    } else {
      navigate('/course-list')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md md:h-14 h-12 flex items-center justify-between bg-white border border-gray-300 rounded-xl shadow-sm mx-auto"
    >
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="w-5 md:w-6 ml-3 opacity-60"
      />

      <input
        type="text"
        placeholder="Search for courses..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 h-full px-3 text-gray-600 placeholder-gray-400 focus:outline-none text-sm md:text-base"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-r-xl text-white md:px-6 px-4 h-full text-sm md:text-base"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
