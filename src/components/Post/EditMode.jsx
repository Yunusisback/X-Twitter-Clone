import React, { useRef, useState } from 'react';
import { BiSolidSave } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { BsTrashFill } from 'react-icons/bs';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './../../firebase/config';
import { IoMdReturnLeft } from 'react-icons/io';


    const EditMode = ({tweet,close}) => {
    const inputRef = useRef ()

    // resim silinecek mi state
    const [isPicDeleting, setIsPicDeleting] = useState(false);

    // kaydet butonuna tıklanınca çalışır
    const handleSave = () => {

    // 1) inputun içeriğine eriş 
    const newText = inputRef.current.value

    // 2) güncellenecek dökümanın referansını al
    const tweetRef = doc(db,"tweets",tweet.id)

    // 3) dökümanın textContentini güncelle
    // * eğer resim silinecekse imageContent null yap

    if (isPicDeleting){
      updateDoc(tweetRef,{textContent: newText,imageContent:null})

    }else{
      updateDoc(tweetRef,{textContent: newText})
    }

    // 4) düzenleme modunu kapat 
    close()
    }

  return (
    <>
    <input
    ref ={inputRef}
    defaultValue={tweet.textContent} className='rounded p-1 px-2  text-black ' type="text" />

    <button onClick={handleSave} className="mx-5 p-2 text-green-400 rounded-full shadow hover:shadow-green-500">
        < BiSolidSave />
    </button>

    <button onClick={close}
        className="mx-5 p-2 text-red-400 rounded-full shadow hover:shadow-red-500">
        <ImCancelCircle />
    </button>

    {tweet.imageContent && (
      <div className='relative'>

      <img
       className={`w-full max-h-[400px] object-cover rounded-lg my-2 ${isPicDeleting ? 'blur' : ''}`}
       src={tweet.imageContent}
       alt="tweet-image"
      />

      <button onClick={() => setIsPicDeleting(!isPicDeleting)} 
      className='absolute top-0 right-0 text-xl p-2  bg-white transition text-red-600 rounded-full hover:scale-90 '>

        {isPicDeleting ? <IoMdReturnLeft className='fw-bold' /> : <BsTrashFill />}
      </button>
      </div>
    )}
    </>
  )
}

export default EditMode