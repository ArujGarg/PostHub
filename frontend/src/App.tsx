import BackgroundBeamsDemo from '../components/background-beams-demo'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import { SignupFormDemo } from './pages/Signup'
import { SigninFormDemo } from './pages/Signin'
import { Home } from './pages/Home'
import { Post } from './pages/Post'
import { SearchComp } from './pages/Search'
import { Chat } from './pages/Chat'



function App() {


  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/landing' element={<BackgroundBeamsDemo />} />
        <Route path='/signup' element={<SignupFormDemo />} />
        <Route path='/signin' element={<SigninFormDemo />} />
        <Route path='/home' element={<Home />} />
        <Route path='/post/:id' element={<Post/>} />
        <Route path='/search' element={<SearchComp />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
