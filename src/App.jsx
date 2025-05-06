import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CarSpecs from './pages/CarSpecs'
import CarList from './pages/CarList'
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/car-detail' element={<CarSpecs/>}/>
    <Route path='/cars' element={<CarList/>} />
    {/* <Route path='/contact' element={<div>Contact</div>} /> */}
   </Routes>
   </BrowserRouter>
  )
}

export default App