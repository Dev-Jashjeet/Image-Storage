import type imgObjInterface from "./Interface";

function ImageBox({itemObj}:{itemObj: imgObjInterface}) {
    
    const imageDownload = (): void => {
        const a = document.createElement("a");
        a.href = String(itemObj.imageURL);
        a.download = itemObj.name;
        a.click();
        a.remove();
        return;
    }

    return(
        <div className='bg-gray-100 border-gray-400 h-fit w-80 relative rounded-2xl hover:scale-102 transition-transform bg-cover'>
            <img src={String(itemObj.imageURL)} className='w-full rounded-tr-2xl rounded-tl-2xl object-cover' />

            <div className='flex flex-col p-3 rounded-bl-2xl rounded-br-2xl '>
              <div className='flex flex-col'>
                <span className='font-bold text-[15px] text-black'>{itemObj.name}</span>
                <span className='text-gray-500'>{itemObj.imageSize}Mb</span>
              </div>
              <span className='flex gap-3 mt-3'>
                <span onClick={imageDownload} className='text-white cursor-pointer bg-green-500 text-center p-2 w-[40px] rounded-lg'><i className="ri-download-fill"></i></span>
                <span className='text-white cursor-pointer bg-red-500 text-center p-2 w-[40px] rounded-lg'><i className="ri-delete-bin-line"></i></span>
              </span>
            </div>

        </div>
    )
}

export default ImageBox;