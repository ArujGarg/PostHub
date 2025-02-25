import BackgroundBeamsDemo from '../components/background-beams-demo'
import { BrowserRouter } from "react-router-dom"
import './App.css'
import { Navbar } from '../components/Navbar'

function App() {


  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <BackgroundBeamsDemo />
      </BrowserRouter>
    </div>
  )
}

export default App
