import Aside from '../components/Aside';
import Nav from '../components/Nav';
import Main from '../components/Main';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase/config";



const FeedPage = () => {
  const [user, setUser] = useState(null)

  // kullanıcı bilgisine abone ol
  useEffect(() => {

    // anlık olarak aktif kullanıcının bilgisine abone olduk
    // kullanıcı değiştiği anda mevcut kullanıcının bilgisini state aktardık
    const unsub = onAuthStateChanged(auth, (currUser) => setUser(currUser))

    // kullanıcı anasayfadan ayrılırsa aboneliği sonlandırılır
    return () => unsub()

  }, [])
  return (
    <div className='feed h-screen bg-black overflow-hidden'>
      <Nav user={user}/>
      <Main user={user} />
      <Aside />
    </div>
  )
}

export default FeedPage