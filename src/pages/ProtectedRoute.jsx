import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import {Navigate, Outlet } from 'react-router-dom'
import { auth } from '../firebase/config'

const ProtectedRoute = () => {
    // Kullanıcın yetkisi var mı?
      const [isAuth,setIsAuth] = useState(null)
    useEffect(() => {
        // anlık olarak kullanıcının oturumunu izler
        // verdiğimiz her fonskiyon her oturum değiştiğinde çalışır
        // ve parametre olarak aktif kullanıcıyı alır
       const unsub = onAuthStateChanged(auth, (user)=>{
        console.log( "aktif kul:" ,user)

        if(user) {
        setIsAuth(true)
        }else{
        setIsAuth(false)
        }
      })

      return () => unsub ();
    },[])


     // Kullanıcın yetkisi yoksa logine yönlendir
     if(isAuth=== false){
        return <Navigate to={'/'} replace />;
     }

    // Kullanıcın yetkisi varsa alt route'a geçmesine izin ver
  return <div> 
   
    <Outlet/>
  </div>
     
  
}

export default ProtectedRoute