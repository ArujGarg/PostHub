import BackgroundBeamsDemo from '../components/background-beams-demo'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import { SignupFormDemo } from './pages/Signup'
import { SigninFormDemo } from './pages/Signin'
import { Home } from './pages/Home'
import { Post } from './pages/Post'
import { Chat } from './pages/Chat'
import { ProfilePage } from './pages/Profile'



function App() {


  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/landing' element={<BackgroundBeamsDemo />} />
        <Route path='/signup' element={<SignupFormDemo />} />
        <Route path='/signin' element={<SigninFormDemo />} />
        <Route path='/home' element={<Home />} />
        <Route path='/post/:id' element={<Post/>} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/:username' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
