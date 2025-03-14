import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost, Login } from './pages';
import { motion } from 'framer-motion';
import user from './images/user-round.svg';

function AppContent() {
  const location = useLocation();

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
        <div className='flex gap-5'>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <Link
              to="/ArtSquirt-frontend/create-post"
              className="font-inter font-medium bg-[#ffa371] text-white px-4 py-2 rounded-md blue-glassmorphism"
            >
              Create Post
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <Link
              to="/ArtSquirt-frontend/login"
              className="h-2 w-2"
            >
              <img src={user} alt="user" className="w-8 h-8" />
            </Link>
          </motion.div>
        </div>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-body min-h-[calc(100vh-73px)]">
        <motion.div
          key={location.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Routes location={location}>
            <Route path="/ArtSquirt-frontend" element={<Home />} />
            <Route path="/ArtSquirt-frontend/create-post" element={<CreatePost />} />
            <Route path="/ArtSquirt-frontend/login" element={<Login />} />
          </Routes>
        </motion.div>
      </main>
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
