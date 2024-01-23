import React,{useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ProductList from './ProductList/ProductList'
import MobileFilter from './Leftbar/MobileView/MobileFilter'
import Category from './Leftbar/Category/Category'
import Filter from './Topbar/Filter/Filter'

const Products = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  return (
    <>
    <Navbar />

    {/* ============= Product List and Filter section start ============= */}

    <div className="bg-white">
      <div>
        {/* --------------- > Mobile filter dialog ---------------------- */}
        <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} />


        <main className="mx-auto max-w-xxl px-4 sm:px-6 lg:px-8">
          {/* ----------------===================>    Topbar options    <=====================----------------------------*/}
          <Filter setMobileFiltersOpen={setMobileFiltersOpen}  />

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/*--------------  Filters by color category ---------------*/}
             <Category />

              {/* ============= Product grid  OR LIST =========*/}
              <div className="lg:col-span-3">
                <ProductList />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>

    {/* ============= Product List and Filter section End ============= */}
    
    <Footer />
    </>
  )
}

export default Products