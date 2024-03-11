import React from 'react'
import Home from './pages/Home/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Products from './pages/products/Products'
import ProductDes from './pages/ProductDescription/ProductDes'
import PageNotFound from './pages/404/PageNotFound'
import SignUp from './pages/Auth/SignUp'
import SignIn from './pages/Auth/SignIn'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products/:categery' element={<Products />} />
      <Route path='/product/:subject/:id' element={<ProductDes />} />
      <Route path="/register" element={<SignUp/>} />
      <Route path="/login" element={<SignIn/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App