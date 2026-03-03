import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Update from './Update'
import Read from './Read'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/create' element={<Create/>} />
      <Route path='/update/:id' element={<Update/>} />
      <Route path='/read/:id' element={<Read/>} />
      <Route path='/' element={<Home/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
