import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage';
import FeedPage from './pages/FeedPage';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase/config';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        {/* todo > bu route'a sadece oturumu açık kullanıcılar girebilsin */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<FeedPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
