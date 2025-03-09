import BackgroundBeamsDemo from '../components/background-beams-demo'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import { SignupFormDemo } from './pages/Signup'
import { SigninFormDemo } from './pages/Signin'
import { Home } from './pages/Home'


function App() {


  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path='/landing' element={<BackgroundBeamsDemo />} />
          <Route path='/signup' element={<SignupFormDemo />} />
          <Route path='/signin' element={<SigninFormDemo />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
