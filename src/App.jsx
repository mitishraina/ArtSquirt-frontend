import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost, Login, Signup } from './pages';
import { motion } from 'framer-motion';
import user from './images/user-round.svg';
import Loader from './components/Loader';
import { useState } from 'react';

function MainLayout({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUserClick = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/ArtSquirt-frontend/login');
    }, 1000);
  };

  return (
    <>
      <header className="w-full flex justify-between items-center gradient-bg sm:px-8 px-4 py-4">
        <Link to="/ArtSquirt-frontend/">
          <motion.img
            src={logo}
            alt="logo"
            className="w-60 mt-2 object-contain"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          />
        </Link>
        <div className='flex gap-5 items-center justify-center'>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <Link
              to="/ArtSquirt-frontend/create-post"
              className="font-inter font-medium text-white px-4 py-2 rounded-md blue-glassmorphism"
            >
              Create Post
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <button
              onClick={handleUserClick}
              className='cursor-pointer font-inter flex items-center font-medium text-white px-4 py-1.5 rounded-md blue-glassmorphism'
            >
              <img src={user} alt="user" className="w-5 h-5 mr-2" />User
            </button>
          </motion.div>
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-body min-h-[calc(100vh-73px)]">
        {loading ? (
          <div className='flex justify-center items-center h-[calc(100vh-200px)]'>
            <Loader />
          </div>
        ) : (
          children
        )}
      </main>
    </>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <motion.div
        key={location.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Routes location={location}>
          <Route path="/ArtSquirt-frontend/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/ArtSquirt-frontend/create-post" element={<MainLayout><CreatePost /></MainLayout>} />
        </Routes>
      </motion.div>
      <Routes>
        <Route path="/ArtSquirt-frontend/login" element={<Login />} />
        <Route path="/ArtSquirt-frontend/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
