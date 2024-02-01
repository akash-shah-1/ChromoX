import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductList from "./ProductList/ProductList";
import MobileFilter from "./Leftbar/MobileView/MobileFilter";
import Category from "./Leftbar/Category/Category";
import Filter from "./Topbar/Filter/Filter";
import styled from "styled-components";

const Scroller = styled.div`
  height: 90vh;
  overflow-y: auto;
  scrollbar-width: 0px;


  &::-webkit-scrollbar {
    width: 0.1em;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
    border-radius:20px
  }
`;

const Products = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* ============= Product List and Filter section start ============= */}

      <div className="bg-white">
        <div>
          {/* --------------- > Mobile filter dialog ---------------------- */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />

          <main className="mx-auto max-w-xxl px-4 sm:px-6 lg:px-8">
            {/* ----------------===================>    Topbar options    <=====================----------------------------*/}
            <Filter setMobileFiltersOpen={setMobileFiltersOpen} />

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/*--------------  Filters by color category ---------------*/}
                <Category />

                {/* ============= Product grid  OR LIST =========*/}
                <Scroller className="lg:col-span-3">
                  <ProductList />
                </Scroller>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* ============= Product List and Filter section End ============= */}

      <Footer />
    </>
  );
};

export default Products;
