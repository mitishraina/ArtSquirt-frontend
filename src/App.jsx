import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { logo } from './assets'
import { Home, CreatePost } from './pages'

function App() {
  

  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center gradient-bg sm:px-8 px-4 py-4'>
        <Link to='/ArtSquirt'>
          <img src={logo} alt='logo' className='w-60 mt-2 object-contain' />
        </Link>
        <Link to='/ArtSquirt/create-post' className='font-inter font-medium bg-[#ffa371] text-white px-4 py-2 rounded-md blue-glassmorphism'>
          Create Post
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-body min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/ArtSquirt' element={<Home />} />
          <Route path='/ArtSquirt/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
