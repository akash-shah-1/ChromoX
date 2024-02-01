import React, {useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Description from './Description'


const ProductDes = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
        <Navbar />
        <Description />
        <Footer />
    </div>
  )
}

export default ProductDes