import React from 'react'
import Home from './pages/Home/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Products from './pages/products/Products'
import ProductDes from './pages/ProductDescription/ProductDes'
import PageNotFound from './pages/404/PageNotFound'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Products />} />
      <Route path='/product_name/des' element={<ProductDes />} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App