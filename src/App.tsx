import 'animate.css'
import 'remixicon/fonts/remixicon.css'
import './App.css'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ImageBox from './ImageBox'
import type imgObjInterface from './Interface'

function App() {

  const [images, setImages] = useState<imgObjInterface[]>([]);

  useEffect( () => console.log(images), [images]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement, Element>) => {
    const input = e.target;
    const file = input.files![0];
    if(file.type.startsWith("image/")) {
      if(file.size > 5*1024*1024) {
        return toast.error("Image size too large please select image under 5Mb");
      }
      const imageBinary = new FileReader();
      imageBinary.readAsDataURL(file);
      imageBinary.onload = () => {
        const imgObj: imgObjInterface = {
          name: file.name,
          imageSize: Number((((file.size)/1024)/1024).toFixed(1)),
          imageURL: imageBinary.result,
        }
        setImages([...images, imgObj]);
        return toast.success("Image Uploaded");
      }
    } else {
      return toast.error("Please select image file");
    }
  }
  
  return(
    <div className="min-h-screen bg-gray-200">
      <h1 className="font-bold text-5xl text-center pt-10">Image Storage</h1>
      <div className='flex justify-center mt-8 relative'>
        <label htmlFor='image' className="hover:scale-105 transition-transform bg-indigo-600 border-2 border-dashed cursor-pointer flex flex-col h-40 w-150 text-4xl gap-3 text-white rounded-xl justify-center items-center">
          <input type="file" className='hidden' id='image' onChange={(e) => handleChange(e)}/>
          <i className="ri-upload-2-line"></i>
          Upload Image
        </label>
      </div>

      <div className='w-full mt-5 flex justify-center'>
        <div className='grid grid-cols-4 w-fit p-10 gap-10 sm:grid-cols-1'>
          {
            images.map((itemObj: imgObjInterface, unique: number) => (
              <ImageBox itemObj={itemObj} key={unique}/>
            ))
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}


export default App;
