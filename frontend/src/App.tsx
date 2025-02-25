import BackgroundBeamsDemo from '../components/background-beams-demo'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import { Navbar } from '../components/Navbar'
import { SignupFormDemo } from './pages/Signup'

function App() {


  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path='/landing' element={<BackgroundBeamsDemo />} />
          <Route path='/signup' element={<SignupFormDemo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
