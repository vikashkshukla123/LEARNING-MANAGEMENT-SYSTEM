// import React, { useEffect, useRef, useState } from 'react'
// import uniqid from 'uniqid'
// import Quill from 'quill'


// const AddCourse = () => {

//   const quillRef = useRef(null);
//   const editorRef = useRef(null);

//   const [courseTitle,setCourseTitle] = useState('')
//   const [coursePrice,setCoursePrice] = useState(0)
//   const [discount,setDiscount] = useState(0)
//   const [image,setImage] = useState(null)
//   const [chapters,setChapters] = useState([])
//   const [showPopUp,setShowPopUp] = useState(false)
//   const [currentChapterId,setCurrentChapterId] = useState(null)
//   const [lectureDetails,setLectureDetails] = useState(
//     {
//       lectureTitle : '',
//       lectureDuration : '',
//       lectureUrl : '',
//       isPreviewFree : false,
//     }
//   )

//   useEffect(()=>{
//     // initiate quill only once
//     if(!quillRef.current && editorRef.current){
//       quillRef.current = new Quill(editorRef.current,{
//         theme : 'snow',
//       })
//     }
//   },[])
//   return (
//     <div className='h-screen overflow-scroll flex flex-cols items-start justify-between 
//     md:p-8 md:pb-0 p-4 pt-8 pb-0'>
//       <form>
//         <div className='flex flex-cols gap-1'>
//           <p>Course Title</p>
//           <input onChange = {e=> setCourseTitle(e.target.value)} value={courseTitle} type="text"  placeholder='Type Here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500'required/>
//         </div>
//         <div className='flex flex-col gap-1'>
//           <p>Course Discription</p>
//           <div>ref={editorRef}</div>

//         </div>
//       </form>
      
//     </div>
//   )






//   return (
//     <div>
        
//     </div>
//   )
// }

// export default AddCourse
// import React, { useEffect, useRef, useState } from 'react'
// import uniqid from 'uniqid'
// import Quill from 'quill'
// import { assets } from '../../assets/assets' // adjust path if needed

// const AddCourse = () => {
//   const quillRef = useRef(null)
//   const editorRef = useRef(null)

//   const [courseTitle, setCourseTitle] = useState('')
//   const [coursePrice, setCoursePrice] = useState(0)
//   const [discount, setDiscount] = useState(0)
//   const [image, setImage] = useState(null)

//   // chapters: [{ id, chapterTitle, collapsed, chapterContent: [{ id, lectureTitle, lectureDuration, lectureUrl, isPreviewFree }] }]
//   const [chapters, setChapters] = useState([])

//   // popup state for adding a lecture
//   const [showPopup, setShowPopup] = useState(false)
//   const [currentChapterId, setCurrentChapterId] = useState(null)
//   const [lectureDetails, setLectureDetails] = useState({
//     lectureTitle: '',
//     lectureDuration: '',
//     lectureUrl: '',
//     isPreviewFree: false
//   })

//   useEffect(() => {
//     // init quill once
//     if (!quillRef.current && editorRef.current) {
//       quillRef.current = new Quill(editorRef.current, {
//         theme: 'snow'
//       })
//     }
//   }, [])

//   // Add a new chapter
//   const handleAddChapter = () => {
//     const newChapter = {
//       id: uniqid(),
//       chapterTitle: `Chapter ${chapters.length + 1}`,
//       collapsed: false,
//       chapterContent: []
//     }
//     setChapters(prev => [...prev, newChapter])
//   }

//   // Delete chapter by id
//   const handleDeleteChapter = (chapterId) => {
//     setChapters(prev => prev.filter(c => c.id !== chapterId))
//     // if popup was for this chapter, close it
//     if (currentChapterId === chapterId) {
//       setShowPopup(false)
//       setCurrentChapterId(null)
//     }
//   }

//   // Toggle collapse/expand chapter
//   const toggleChapter = (chapterId) => {
//     setChapters(prev =>
//       prev.map(c =>
//         c.id === chapterId ? { ...c, collapsed: !c.collapsed } : c
//       )
//     )
//   }

//   // Open popup to add lecture to a chapter
//   const openAddLecturePopup = (chapterId) => {
//     setCurrentChapterId(chapterId)
//     setLectureDetails({
//       lectureTitle: '',
//       lectureDuration: '',
//       lectureUrl: '',
//       isPreviewFree: false
//     })
//     setShowPopup(true)
//   }

//   // Add lecture to current chapter
//   const handleAddLecture = () => {
//     if (!currentChapterId) return
//     const newLecture = {
//       id: uniqid(),
//       lectureTitle: lectureDetails.lectureTitle.trim() || 'Untitled Lecture',
//       lectureDuration: lectureDetails.lectureDuration || '',
//       lectureUrl: lectureDetails.lectureUrl || '',
//       isPreviewFree: lectureDetails.isPreviewFree
//     }

//     setChapters(prev =>
//       prev.map(c =>
//         c.id === currentChapterId
//           ? { ...c, chapterContent: [...c.chapterContent, newLecture] }
//           : c
//       )
//     )

//     // close popup
//     setShowPopup(false)
//     setCurrentChapterId(null)
//     setLectureDetails({
//       lectureTitle: '',
//       lectureDuration: '',
//       lectureUrl: '',
//       isPreviewFree: false
//     })
//   }

//   // Delete lecture from a chapter
//   const handleDeleteLecture = (chapterId, lectureId) => {
//     setChapters(prev =>
//       prev.map(c =>
//         c.id === chapterId
//           ? { ...c, chapterContent: c.chapterContent.filter(l => l.id !== lectureId) }
//           : c
//       )
//     )
//   }

//   // file change handler
//   const handleImageChange = (e) => {
//     const file = e.target.files && e.target.files[0]
//     if (file) setImage(file)
//   }

//   // Submit handler (example: log collected values)
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Get description HTML from quill if available
//     const descriptionHtml = quillRef.current ? quillRef.current.root.innerHTML : ''
//     // Build payload
//     const payload = {
//       title: courseTitle,
//       price: Number(coursePrice),
//       discount: Number(discount),
//       description: descriptionHtml,
//       chapters,
//       // Note: for file upload you'd send `image` in FormData
//       thumbnail: image ? image.name : null
//     }

//     console.log('Submitting course payload:', payload)
//     // TODO: call API with payload
//     alert('Course payload logged to console (replace with API call)')
//   }

//   return (
//     <div className='h-screen overflow-auto flex flex-col items-start justify-start md:p-8 p-4 pt-8 pb-0'>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-3xl w-full text-gray-700'>

//         {/* Course Title */}
//         <div className='flex flex-col gap-1'>
//           <label className='font-medium'>Course Title</label>
//           <input
//             onChange={e => setCourseTitle(e.target.value)}
//             value={courseTitle}
//             type="text"
//             placeholder='Type Here'
//             className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-300'
//             required
//           />
//         </div>

//         {/* Course Description (Quill) */}
//         <div className='flex flex-col gap-1'>
//           <label className='font-medium'>Course Description</label>
//           <div
//             ref={editorRef}
//             className='h-40 border border-gray-300 rounded bg-white'
//           />
//         </div>

//         {/* Price & Thumbnail */}
//         <div className='flex items-center justify-between flex-wrap gap-4'>
//           <div className='flex flex-col gap-1'>
//             <label className='font-medium'>Course Price</label>
//             <input
//               onChange={e => setCoursePrice(e.target.value)}
//               value={coursePrice}
//               type="number"
//               placeholder='0'
//               className='outline-none py-2 w-36 px-3 rounded border border-gray-300'
//               required
//             />
//           </div>

//           <div className='flex flex-col md:flex-row items-center gap-3'>
//             <label className='font-medium'>Course Thumbnail</label>
//             <label htmlFor="thumbnailImage" className='flex items-center gap-3 cursor-pointer'>
//               <img src={assets.file_upload_icon} alt="upload" className='p-3 bg-blue-500 rounded' />
//               <input
//                 type="file"
//                 id='thumbnailImage'
//                 onChange={handleImageChange}
//                 accept='image/*'
//                 hidden
//               />
//               {image ? (
//                 <img className='max-h-12 rounded' src={URL.createObjectURL(image)} alt="Preview" />
//               ) : (
//                 <span className='text-sm text-gray-500'>No file chosen</span>
//               )}
//             </label>
//           </div>

//           <div className='flex flex-col gap-1'>
//             <label className='font-medium'>Discount %</label>
//             <input
//               onChange={e => setDiscount(e.target.value)}
//               value={discount}
//               type="number"
//               placeholder='0'
//               min={0}
//               max={100}
//               className='outline-none py-2 w-28 px-3 rounded border border-gray-300'
//             />
//           </div>
//         </div>

//         {/* Chapters area */}
//         <div className='mt-4'>
//           <div className='flex items-center justify-between mb-2'>
//             <h3 className='text-lg font-semibold'>Chapters</h3>
//             <div className='inline-flex items-center gap-2'>
//               <button type='button' onClick={handleAddChapter} className='bg-blue-500 text-white px-3 py-1 rounded'>+ Add Chapter</button>
//             </div>
//           </div>

//           <div className='space-y-4'>
//             {chapters.length === 0 && <div className='text-gray-500'>No chapters yet. Add one to start.</div>}

//             {chapters.map((chapter, chapterIndex) => (
//               <div key={chapter.id} className='bg-white border rounded-lg shadow-sm'>
//                 <div className='flex justify-between items-center p-4 border-b'>
//                   <div className='flex items-center'>
//                     <button
//                       type='button'
//                       onClick={() => toggleChapter(chapter.id)}
//                       className={`mr-3 transform transition-transform ${chapter.collapsed ? '-rotate-90' : 'rotate-0'}`}
//                       aria-label='toggle chapter'
//                     >
//                       <img src={assets.dropdown_icon} width={16} alt="toggle" />
//                     </button>

//                     <input
//                       type="text"
//                       value={chapter.chapterTitle}
//                       onChange={(e) =>
//                         setChapters(prev => prev.map(c => c.id === chapter.id ? { ...c, chapterTitle: e.target.value } : c))
//                       }
//                       className='font-semibold outline-none border-b border-transparent focus:border-gray-300'
//                     />
//                   </div>

//                   <div className='flex items-center gap-4'>
//                     <div className='text-sm text-gray-500'>
//                       {chapter.chapterContent.length} {chapter.chapterContent.length === 1 ? 'Lecture' : 'Lectures'}
//                     </div>

//                     <button
//                       type='button'
//                       onClick={() => openAddLecturePopup(chapter.id)}
//                       className='text-sm bg-gray-100 px-3 py-1 rounded'
//                     >
//                       + Add Lecture
//                     </button>

//                     <button type='button' onClick={() => handleDeleteChapter(chapter.id)} title='Delete chapter'>
//                       <img src={assets.cross_icon} alt='delete' className='w-4 h-4' />
//                     </button>
//                   </div>
//                 </div>

//                 {!chapter.collapsed && (
//                   <div className='p-4 space-y-2'>
//                     {chapter.chapterContent.length === 0 && <div className='text-sm text-gray-500'>No lectures yet</div>}

//                     {chapter.chapterContent.map((lecture, lectureIndex) => (
//                       <div key={lecture.id} className='flex justify-between items-center bg-gray-50 p-2 rounded'>
//                         <div className='text-sm'>
//                           <div className='font-medium'>{lectureIndex + 1}. {lecture.lectureTitle}</div>
//                           <div className='text-xs text-gray-500'>
//                             {lecture.lectureDuration ? `${lecture.lectureDuration} mins` : 'Duration N/A'} &nbsp; - &nbsp;
//                             {lecture.lectureUrl ? <a href={lecture.lectureUrl} target='_blank' rel='noreferrer' className='text-blue-500 underline'>Link</a> : 'No URL'} &nbsp; - &nbsp;
//                             {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
//                           </div>
//                         </div>
//                         <div className='flex items-center gap-3'>
//                           <button type='button' onClick={() => handleDeleteLecture(chapter.id, lecture.id)} title='Delete lecture'>
//                             <img src={assets.cross_icon} alt='delete' className='w-4 h-4' />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Popup modal for adding lecture */}
//         {showPopup && (
//           <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50'>
//             <div className='bg-white text-gray-700 p-6 rounded w-full max-w-md relative'>
//               <button onClick={() => setShowPopup(false)} className='absolute top-3 right-3'>
//                 <img src={assets.cross_icon} alt='close' className='w-4 h-4' />
//               </button>

//               <h2 className='text-lg font-semibold mb-3'>Add Lecture</h2>

//               <div className='mb-3'>
//                 <label className='block text-sm'>Lecture Title</label>
//                 <input
//                   type='text'
//                   value={lectureDetails.lectureTitle}
//                   onChange={e => setLectureDetails(prev => ({ ...prev, lectureTitle: e.target.value }))}
//                   className='mt-1 block w-full border rounded px-2 py-1'
//                 />
//               </div>

//               <div className='mb-3'>
//                 <label className='block text-sm'>Duration (minutes)</label>
//                 <input
//                   type='number'
//                   value={lectureDetails.lectureDuration}
//                   onChange={e => setLectureDetails(prev => ({ ...prev, lectureDuration: e.target.value }))}
//                   className='mt-1 block w-full border rounded px-2 py-1'
//                 />
//               </div>

//               <div className='mb-3'>
//                 <label className='block text-sm'>Lecture URL</label>
//                 <input
//                   type='text'
//                   value={lectureDetails.lectureUrl}
//                   onChange={e => setLectureDetails(prev => ({ ...prev, lectureUrl: e.target.value }))}
//                   className='mt-1 block w-full border rounded px-2 py-1'
//                 />
//               </div>

//               <div className='mb-4 flex items-center gap-2'>
//                 <input
//                   id='isPreviewFree'
//                   type='checkbox'
//                   checked={lectureDetails.isPreviewFree}
//                   onChange={e => setLectureDetails(prev => ({ ...prev, isPreviewFree: e.target.checked }))}
//                 />
//                 <label htmlFor='isPreviewFree' className='text-sm'>Is Preview Free?</label>
//               </div>

//               <div className='flex gap-3'>
//                 <button type='button' onClick={handleAddLecture} className='flex-1 bg-blue-500 text-white px-4 py-2 rounded'>Add Lecture</button>
//                 <button type='button' onClick={() => setShowPopup(false)} className='flex-1 border px-4 py-2 rounded'>Cancel</button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className='mt-6'>
//           <button type='submit' className='bg-black text-white w-max py-2.5 px-8 rounded'>ADD COURSE</button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default AddCourse



import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  // Course fields
  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);

  // Chapters & UI state
  const [chapters, setChapters] = useState([]); // each: { id, chapterTitle, collapsed, chapterContent: [{...}] }
  const [showChapterPopup, setShowChapterPopup] = useState(false);
  const [newChapterName, setNewChapterName] = useState('');

  // Lecture popup per chapter
  const [showLecturePopup, setShowLecturePopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  // Initialize Quill once
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  // Handlers
  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
  };

  const openAddChapterPopup = () => {
    setNewChapterName('');
    setShowChapterPopup(true);
  };

  const addChapter = () => {
    const title = newChapterName.trim();
    if (!title) return; // ignore empty
    const newChapter = {
      id: uniqid(),
      chapterTitle: title,
      collapsed: false, // start open
      chapterContent: [], // lectures
    };
    setChapters((prev) => [...prev, newChapter]);
    setShowChapterPopup(false);
    setNewChapterName('');
  };

  const deleteChapter = (chapterId) => {
    setChapters((prev) => prev.filter((c) => c.id !== chapterId));
  };

  const toggleChapterCollapse = (chapterId) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, collapsed: !c.collapsed } : c))
    );
  };

  // Lecture popup and operations
  const openAddLecturePopup = (chapterId) => {
    setCurrentChapterId(chapterId);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
    setShowLecturePopup(true);
  };

  const addLectureToChapter = () => {
    const title = lectureDetails.lectureTitle.trim();
    if (!title || !currentChapterId) return;
    const newLecture = {
      id: uniqid(),
      lectureTitle: lectureDetails.lectureTitle,
      lectureDuration: lectureDetails.lectureDuration,
      lectureUrl: lectureDetails.lectureUrl,
      isPreviewFree: !!lectureDetails.isPreviewFree,
    };
    setChapters((prev) =>
      prev.map((c) =>
        c.id === currentChapterId ? { ...c, chapterContent: [...c.chapterContent, newLecture] } : c
      )
    );
    setShowLecturePopup(false);
    setCurrentChapterId(null);
  };

  const deleteLecture = (chapterId, lectureId) => {
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId
          ? { ...c, chapterContent: c.chapterContent.filter((l) => l.id !== lectureId) }
          : c
      )
    );
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    // Gather data (you can send to backend)
    const description = quillRef.current ? quillRef.current.root.innerHTML : '';
    const payload = {
      title: courseTitle,
      price: Number(coursePrice),
      discount: Number(discount),
      description,
      chapters,
      // image handling: send image as FormData etc.
    };
    console.log('course payload', payload);
    // TODO: upload / API call
  };

  return (
    <div className="h-screen overflow-auto flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-0">
      <form className="flex flex-col gap-4 max-w-3xl w-full text-gray-700" onSubmit={handleCourseSubmit}>
        {/* Course Title */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Course Title</label>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type Here"
            className="outline-none py-2 px-3 rounded border border-gray-300"
            required
          />
        </div>

        {/* Course Description (Quill) */}
        <div className="flex flex-col gap-1 mt-2">
          <label className="font-medium">Course Description</label>
          <div ref={editorRef} className="h-40 border border-gray-300 rounded bg-white" />
        </div>

        {/* Price & Thumbnail */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Course Price</label>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              className="outline-none py-2 w-36 px-3 rounded border border-gray-300"
              required
            />
          </div>

          <div className="flex md:flex-row flex-col items-center gap-3">
            <label className="font-medium">Course Thumbnail</label>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3 cursor-pointer">
              <img src={assets.file_upload_icon} alt="upload" className="p-3 bg-blue-500 rounded" />
              <input
                type="file"
                id="thumbnailImage"
                onChange={handleThumbnailChange}
                accept="image/*"
                hidden
              />
              {image && (
                <img className="max-h-16 rounded" src={URL.createObjectURL(image)} alt="Preview" />
              )}
            </label>
          </div>
        </div>

        {/* Discount */}
        <div className="flex flex-col gap-1 w-36">
          <label className="font-medium">Discount %</label>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            type="number"
            placeholder="0"
            min={0}
            max={100}
            className="outline-none py-2 px-3 rounded border border-gray-300"
          />
        </div>

        {/* Chapters section */}
        <div className="mt-4 w-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Chapters</h3>
            <div
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded cursor-pointer"
              onClick={openAddChapterPopup}
            >
              + Add Chapter
            </div>
          </div>

          {/* Chapters list */}
          {chapters.length === 0 && (
            <div className="text-sm text-gray-500 mb-4">No chapters yet. Click "Add Chapter" to create one.</div>
          )}

          <div className="space-y-4">
            {chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id} className="bg-white border rounded-lg shadow-sm">
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center">
                    <img
                      src={assets.dropdown_icon}
                      width={16}
                      alt="toggle"
                      className={`mr-3 cursor-pointer transform transition-transform ${chapter.collapsed ? '-rotate-90' : 'rotate-0'}`}
                      onClick={() => toggleChapterCollapse(chapter.id)}
                    />
                    <span className="font-semibold">
                      {chapterIndex + 1}. {chapter.chapterTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-sm">{chapter.chapterContent.length} lectures</span>
                    <img
                      src={assets.cross_icon}
                      alt="delete"
                      className="cursor-pointer w-4"
                      onClick={() => deleteChapter(chapter.id)}
                    />
                  </div>
                </div>

                {!chapter.collapsed && (
                  <div className="p-4">
                    {chapter.chapterContent.length === 0 && (
                      <div className="text-sm text-gray-500 mb-2">No lectures yet.</div>
                    )}

                    <div className="space-y-2">
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <div key={lecture.id} className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{lectureIndex + 1}. </span>
                            <span>{lecture.lectureTitle} - {lecture.lectureDuration} mins</span>
                            {' · '}
                            <a href={lecture.lectureUrl} target="_blank" rel="noreferrer" className="text-blue-500">Link</a>
                            {' · '}
                            <span className="text-sm text-gray-600">{lecture.isPreviewFree ? 'Free' : 'Paid'}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <img
                              src={assets.cross_icon}
                              alt="delete lecture"
                              className="cursor-pointer w-4"
                              onClick={() => deleteLecture(chapter.id, lecture.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-3"
                      onClick={() => openAddLecturePopup(chapter.id)}
                    >
                      + Add Lecture
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-black text-white w-max py-2.5 px-8 rounded my-4">ADD COURSE</button>
      </form>

      {/* Chapter Add Popup */}
      {showChapterPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white text-gray-800 p-6 rounded w-full max-w-md relative">
            <h2 className="text-lg font-semibold mb-3">Add Chapter</h2>
            <div className="mb-3">
              <label className="block text-sm">Chapter Name</label>
              <input
                type="text"
                value={newChapterName}
                onChange={(e) => setNewChapterName(e.target.value)}
                className="mt-1 block w-full border rounded py-2 px-3"
                placeholder="Enter chapter name"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={addChapter}
              >
                Add
              </button>
              <button
                type="button"
                className="border px-4 py-2 rounded"
                onClick={() => setShowChapterPopup(false)}
              >
                Cancel
              </button>
            </div>

            <img
              src={assets.cross_icon}
              alt="close"
              className="absolute top-4 right-4 w-4 cursor-pointer"
              onClick={() => setShowChapterPopup(false)}
            />
          </div>
        </div>
      )}

      {/* Lecture Add Popup */}
      {showLecturePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white text-gray-800 p-6 rounded w-full max-w-lg relative">
            <h2 className="text-lg font-semibold mb-3">Add Lecture</h2>

            <div className="mb-2">
              <label className="block text-sm">Lecture Title</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded py-2 px-3"
                value={lectureDetails.lectureTitle}
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                placeholder="Lecture Title"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Duration (minutes)</label>
              <input
                type="number"
                className="mt-1 block w-full border rounded py-2 px-3"
                value={lectureDetails.lectureDuration}
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                placeholder="Duration"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Lecture URL</label>
              <input
                type="text"
                className="mt-1 block w-full border rounded py-2 px-3"
                value={lectureDetails.lectureUrl}
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="mb-4 flex items-center gap-2">
              <input
                id="isPreviewFree"
                type="checkbox"
                checked={lectureDetails.isPreviewFree}
                onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
              />
              <label htmlFor="isPreviewFree" className="text-sm">Is Preview Free?</label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={addLectureToChapter}
              >
                Add Lecture
              </button>
              <button type="button" className="border px-4 py-2 rounded" onClick={() => setShowLecturePopup(false)}>
                Cancel
              </button>
            </div>

            <img
              src={assets.cross_icon}
              alt="close"
              className="absolute top-4 right-4 w-4 cursor-pointer"
              onClick={() => setShowLecturePopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
