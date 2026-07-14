import 'animate.css'
import 'remixicon/fonts/remixicon.css'
import './App.css'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
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

  const imageDownload = (itemObj: imgObjInterface): void => {
        const a = document.createElement("a");
        a.href = String(itemObj.imageURL);
        a.download = itemObj.name;
        a.click();
        a.remove();
        return;
    }

    const imageDelete = (imageUrl: string) => {
      const demoImage: imgObjInterface[] = [...images];
      for(let i=0; i<demoImage.length; i++) {
        if(demoImage[i].imageURL === imageUrl) {
          demoImage.splice(i, 1);
          setImages(demoImage);
          return toast.success("Image deleted");
        }
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
        <div className='grid xl:grid-cols-4 w-fit p-10 gap-10 max-xl:grid-cols-1'>
          {
            images.map((itemObj: imgObjInterface, unique: number) => (
                <div className='bg-gray-100 border-gray-400 h-fit w-80 relative rounded-2xl hover:scale-102 transition-transform bg-cover' key={unique}>
                    <img src={String(itemObj.imageURL)} className='w-full rounded-tr-2xl rounded-tl-2xl object-cover' />

                    <div className='flex flex-col p-3 rounded-bl-2xl rounded-br-2xl '>
                      <div className='flex flex-col'>
                        <span className='font-bold text-[15px] text-black'>{itemObj.name}</span>
                        <span className='text-gray-500'>{itemObj.imageSize}Mb</span>
                      </div>
                      <span className='flex gap-3 mt-3'>
                        <span onClick={() => imageDownload(itemObj)} className='text-white cursor-pointer bg-green-500 text-center p-2 w-10 rounded-lg'><i className="ri-download-fill"></i></span>
                        <span onClick={() => imageDelete(String(itemObj.imageURL))} className='text-white cursor-pointer bg-red-500 text-center p-2 w-10 rounded-lg'><i className="ri-delete-bin-line"></i></span>
                      </span>
                    </div>
                </div>
            ))
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}


export default App;
