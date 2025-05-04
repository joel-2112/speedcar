import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CarSpecs from './pages/CarSpecs'
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/car-detail' element={<CarSpecs/>}/>
    {/* <Route path='/cars' element={<div>Cars</div>} />
    <Route path='/contact' element={<div>Contact</div>} /> */}
   </Routes>
   </BrowserRouter>
  )
}

export default App