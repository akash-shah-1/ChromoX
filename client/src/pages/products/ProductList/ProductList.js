import { useEffect, useState } from "react";
import QuickView from "./QuickView/QuickView";
import products from "./productdata";
import {Link} from 'react-router-dom'
import axios from 'axios'


const ProductList = ({filter,sort}) => {
  const [Products,setProducts] =  useState([]);

  const [open, setOpen] = useState(false);
  const handleShow = () => setOpen(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Construct the API request URL with filter and sort options
        let url = 'http://localhost:8080/product?';
        if (filter) {
          for (const key in filter) {
            if (filter.hasOwnProperty(key)) {
              const values = filter[key];
              if (values && values.length > 0) {
                // Handle multiple values for the same key
                values.forEach(value => {
                  url += `${key}=${value}&`;
                });
              }
            }
          }
        }
        
console.log("My url -> ",url)
        if (sort) {
          url += `sort=${sort}`;
        }

        // Fetch products from the backend
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    // Call the fetchProducts function when component mounts
    fetchProducts();
  }, [filter, sort]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2  lg:grid-cols-4  xl:grid-cols-5  xl:gap-x-10" style={{  }} >
            {Products.map((product) => (
              <div key={product.id} className="group relative">
              <Link to='/product_name/des' >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"  >
                  <img
                    src={product.img}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
              </Link>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.desc}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
                {/* Buttons ================ */}
                <div className="flex justify-between">
                  <button onClick={handleShow} className="group relative hover:bg-black hover:text-white flex items-center justify-center group-hover:opacity-100 transition duration-300 bg-transparent font-semibold py-2 px-4 border border-gray-800 rounded md:text-sm">
                    Quick View
                  </button>
                 <Link to='/product_name/des' >
                 <button className="group relative hover:bg-black hover:text-white flex items-center justify-center group-hover:opacity-100 transition duration-300 bg-transparent font-semibold py-2 px-4 border border-gray-800 rounded md:text-sm">
                   Show details
                  </button>
                 </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <QuickView  open={open} setOpen={setOpen}  />
    </>
  );
};

export default ProductList;
