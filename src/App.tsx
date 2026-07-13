import 'animate.css'
import 'remixicon/fonts/remixicon.css'
import './App.css'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

function App() {
  
  return(
    <div className="min-h-screen bg-gray-200">
      <h1 className="font-bold text-5xl text-center pt-10">Image Storage</h1>
      <div className='flex justify-center mt-8 relative'>
        <label htmlFor='image' className="hover:scale-105 transition-transform bg-indigo-600 border-2 border-dashed cursor-pointer flex flex-col h-40 w-150 text-4xl gap-3 text-white rounded-xl justify-center items-center">
          <input type="file" className='bg-red-800 w-full text-xl h-full hidden' id='image'/>
          <i className="ri-upload-2-line"></i>
          Upload Image
        </label>
      </div>

      <div className='w-full mt-5 flex justify-center'>
        <div className='grid grid-cols-4 w-fit p-10 gap-10'>

           <div className='bg-gray-100 border-gray-400 h-fit w-80 relative rounded-2xl hover:scale-102 transition-transform bg-cover'>
            <img className='w-full rounded-tr-2xl rounded-tl-2xl object-cover' />

            <div className='flex flex-col p-3 rounded-bl-2xl rounded-br-2xl '>
              <div className='flex flex-col'>
                <span className='font-bold text-[15px] text-black'>Company.png</span>
                <span className='text-gray-500'>0.6Mb</span>
              </div>
              <span className='flex gap-3 mt-3'>
                <a href='kssj' className='text-white bg-green-500 text-center p-2 w-[40px] rounded-lg'><i className="ri-download-fill"></i></a>
                <a href='jsk' className='text-white bg-red-500 text-center p-2 w-[40px] rounded-lg'><i className="ri-delete-bin-line"></i></a>
              </span>
            </div>

          </div>

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}


export default App;
