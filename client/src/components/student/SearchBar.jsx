


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
