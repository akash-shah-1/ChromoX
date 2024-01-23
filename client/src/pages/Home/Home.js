import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Collections from '../../components/collections/Collections'
import Brand from '../../components/Brands/Brand'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Collections />
        <Brand />
        <Footer />
    </div>
  )
}

export default Home