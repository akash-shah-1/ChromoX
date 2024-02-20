import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductList from "./ProductList/ProductList";
import MobileFilter from "./Leftbar/MobileView/MobileFilter";
import Category from "./Leftbar/Category/Category";
import Filter from "./Topbar/Filter/Filter";
import styled from "styled-components";
import { useLocation } from "react-router-dom";



const Products = () => {
 

  const categery = useLocation();
  const getcatgery = categery.pathname.split("/")[2];

  const [filter, setfilter] = useState({});
  const [Sort,setSort] = useState('')
  const [Active,SetActive] = useState('')

  //Handling filter
  const HandleFilter = (e) => {
    
    const { name, value } = e.target;

    if (name === "price" || name === "size") {
      if (filter.hasOwnProperty(name) && filter[name].includes(value)) {
        setfilter({
          [name]: filter[name].filter((item) => item !== value),
        });
      } else {
        const updatedFilter = {
          ...filter,
          [name]: [value],
        };
        setfilter(updatedFilter);
      }
      return;
    }
    // Check if the filter name exists in the current filter state
    if (filter.hasOwnProperty(name)) {
      // If the value is already selected, remove it
      if (filter[name].includes(value)) {
        const updatedFilter = {
          ...filter,
          [name]: filter[name].filter((item) => item !== value),
        };
        setfilter(updatedFilter);
      } else {
        // If the value is not selected, append it
        const updatedFilter = {
          ...filter,
          [name]: [...filter[name], value],
        };
        setfilter(updatedFilter);
      }
    } else {
      // If the filter name doesn't exist in the current filter state, create a new entry
      setfilter({
        ...filter,
        [name]: [value],
      });
    }
  };

  //HandleSort
  const HandleSort = (optionName) => {
    SetActive(optionName)
    setSort(optionName); 
  };

  
  


  // Use useEffect to observe changes in filter state
  useEffect(() => {
    console.log(filter)
    console.log(Sort)
    console.log(getcatgery)
  }, [Sort, filter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            HandleFilter={HandleFilter} filter={filter}
          />

          <main className="mx-auto max-w-xxl px-4 sm:px-6 lg:px-8">
            {/* ----------------===================>    Topbar options    <=====================----------------------------*/}
            <Filter setMobileFiltersOpen={setMobileFiltersOpen} HandleSort={HandleSort} Active={Active}  />

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-7">
                {/*--------------  Filters by  category ---------------*/}
                <Category HandleFilter={HandleFilter} filter={filter} />
                {/* ============= Product grid OR LIST ========= */}
                <div className="lg:col-span-6 h-full">
                  <ProductList  filter = {filter} sort={Sort} />
                </div>
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
