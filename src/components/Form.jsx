import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { BsCardImage } from "react-icons/bs"
import { db, storage } from "../firebase/config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useState } from "react"
import { v4 } from "uuid"
import Spinner from "./Spinner"
import { toast } from "react-toastify"


const Form = ({ user }) => {

  const [isLoading, setIsLoading] = useState(false)

  // firestore tweet koleksiyonu referansı
  const tweetsCol = collection(db, "tweets")

  // resim yükleyip url döndürüyor
  const uploadImage = async (file) => {
    // dosya resim değilse yüklemeyi durdur
    if (!file || !file.type.startsWith("image")) return null

    const fileRef = ref(storage, file.name.concat(v4()))
    await uploadBytes(fileRef, file)
    return await getDownloadURL(fileRef)
  }

  // tweet gönder
  const handleSubmit = async (e) => {
    e.preventDefault()

    // formdaki verilere erişme
    const form = e.target
    const textContent = form.elements["tweetText"].value
    const imageContent = form.elements["tweetImage"].files[0]

    // doğrulama
    if (!textContent && !imageContent)
      return toast.info("Lütfen içerik ekleyiniz")

    // yükleniyor mu true çevir
    setIsLoading(true)

    const url = await uploadImage(imageContent)

    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL
      },
      likes: [],
      isEDited: false,
    })

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // inputları sıfırla
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-4 border-b-[1px] border-gray-700">
      {user?.photoURL ? (
        <img
          className="rounded-full h-[35px] md:h-[45px] mt-1"
          src={user.photoURL}
          alt="profil"
        />
      ) : (
        <div className="w-[35px] md:w-[45px] h-[35px] md:h-[45px] mt-1 bg-gray-700 text-white flex items-center justify-center rounded-full font-bold uppercase">
          {user?.displayName?.charAt(0) || "?"}
        </div>
      )}

      <div className="w-full">
        {/* yazı kutusu */}
        <input
          name="tweetText"
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          placeholder="Neler Oluyor?"
          type="text"
        />

        <div className="flex justify-between items-center">
          {/* dosya inputu */}
          <input name="tweetImage" className="hidden" id="image" type="file" />

          {/* dosya yükleme butonu */}
          <label className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full" htmlFor="image">
            <BsCardImage />
          </label>

          {/* gönder butonu */}
          <button
            type="submit"
            className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? <Spinner /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form
