import { useState } from "react";
import { auth, provider } from "../firebase/config"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AuthPage = () => {
  // Kayıt ol modunda mıyız? state'i
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isForgotPass, setIsForgotPass] = useState(false);
  const navigate = useNavigate();

  // şifre sıfırlama e-postası gönder
  const sendEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("E-postanıza şifre sıfırlama bağlantısı gönderildi");
      })
      .catch(() => {
        toast.error("Mail gönderilemedi");
      });
  };

  // Google ile giriş
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate('/feed');
      })
      .catch((err) => {
        toast.error(`Google ile giriş başarısız: ${err.code}`);
      });
  };

  // hesaba giriş yap / oluştur
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Yeni hesap oluştur
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabınız başarıyla oluşturuldu");
          navigate('/feed');
        })
        .catch((err) => {
          if (
            err.code === 'auth/wrong-password' ||
            err.code === 'auth/invalid-credential' ||
            err.code === 'auth/invalid-login-credentials'
          ) {
            setIsForgotPass(true);
          }

          toast.error(`Üzgünüz bir hata oluştu: ${err.code}`);
        });
    } else {
      // Var olan hesapta oturum aç
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info('Hesabınıza giriş yapıldı');
          navigate('/feed');
        })
        .catch((err) => {
          if (
            // şifre yanlış yazılınca ortaya çıkan kod dizisi
            // ise şifremi unuttum yazısını göster
            err.code === 'auth/wrong-password' ||
            err.code === 'auth/invalid-credential' ||
            err.code === 'auth/invalid-login-credentials'
          ) {
            setIsForgotPass(true);
          }

          toast.error(`Giriş hatası: ${err.code}`);
        });
    }

    console.log(email, pass);
  };

  return (
    <section className="h-screen grid place-items-center bg-[#242424]">
      <div className="bg-black flex flex-col items-center gap-8 py-10 px-20 rounded-lg">
        {/* X logo (top part) */}
        <img className="h-12 w-12" src="/x-logo.webp" alt="X Logo" />

        {/* Header (center part) */}
        <h1 className="text-white text-xl font-bold">Twitter'a giriş yap</h1>

        {/* Google button */}
        <button onClick={loginWithGoogle} className="flex items-center bg-white py-2 px-10 rounded-full text-black cursor-pointer gap-3 transition hover:bg-gray-300">
          <img className="h-5" src="/google-logo.svg" />
          <span>Google İle Giriş Yap</span>
        </button>

        {/* giriş formu */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mt-5">E-mail</label>
          <input
            type="email"
            required
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Şifre</label>
          <input
            type="password"
            required
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            onChange={(e) => setPass(e.target.value)}
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignup ? 'Kayıt ol' : 'Giriş Yap'}
          </button>

          <p className="mt-5 flex gap-4">
            <span className="text-gray-500">Hesabınız Yoksa</span>
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 cursor-pointer select-none"
            >
              {isSignup ? "Giriş Yapın" : "Kayıt Olun"}
            </span>
          </p>
        </form>

        {isForgotPass && (
          <p onClick={sendEmail} className="text-center text-red-500 cursor-pointer mt-4">
            Şifrenizi mi unuttunuz?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
