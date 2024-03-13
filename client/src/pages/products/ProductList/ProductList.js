import { useEffect, useState } from "react";
import QuickView from "./QuickView/QuickView";
import { Link } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../../../RequestMethods/Requests";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductList = ({ filter, sort, col}) => {
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({});

  const [open, setOpen] = useState(false);
  const handleShow = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Construct the API request URL with filter and sort options
        let url = new URL(`${publicRequest.defaults.baseURL}/product?`);
        if (filter) {
          for (const key in filter) {
            if (filter.hasOwnProperty(key)) {
              const values = filter[key];
              if (values && values.length > 0) {
                // Handle multiple values for the same key
                values.forEach((value) => {
                  url += `${key}=${value}&`;
                });
              }
            }
          }
        }

        console.log("My url -> ", url);
        if (sort) {
          url += `sort=${sort}`;
        }

        // Fetch products from the backend
        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    // Call the fetchProducts function when component mounts
    fetchProducts();
  }, [filter, sort]);

  console.log("My products ===> ", Products);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-full lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>
          {loading ? ( // Render loading indicator if loading is true
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2  xl:grid-cols-4 ">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center justify-center "
                >
                  <Skeleton
                    height={200}
                    width={290}
                    className="bg-gray-200 rounded-md overflow-hidden  "
                  >
                    {/* Image skeleton */}
                    <div className="h-32 bg-gray-300" />
                  </Skeleton>
                  <div className="mt-4  w-full">
                    <Skeleton
                      height={24}
                      width={200}
                      className="mb-2 bg-gray-200 mx-8"
                    />
                    <Skeleton
                      height={16}
                      width={240}
                      className="mb-2 bg-gray-200 mx-8"
                    />
                    <div className="flex justify-between w-full">
                      <Skeleton
                        height={30}
                        width={80}
                        className="bg-gray-200 mx-8"
                      />
                      <Skeleton
                        height={30}
                        width={80}
                        className="bg-gray-200 mx-8"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2  lg:grid-cols-4  ${col?'xl:grid-cols-6':'xl:grid-cols-4'}  xl:gap-x-10`}>
              {Products.map((product) => (
                <div key={product.id} className="group relative">
                  <Link to="/product_name/des">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
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
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
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
                    <button
                      onClick={() => handleShow(product)}
                      className="group relative hover:bg-black hover:text-white flex items-center justify-center group-hover:opacity-100 transition duration-300 bg-transparent font-semibold py-2 px-4 border border-gray-800 rounded md:text-sm"
                    >
                      Quick View
                    </button>
                    <Link to={`/product/${product.subject}/${product._id}`}>
                      <button className="group relative hover:bg-black hover:text-white flex items-center justify-center group-hover:opacity-100 transition duration-300 bg-transparent font-semibold py-2 px-4 border border-gray-800 rounded md:text-sm">
                        Show details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <QuickView open={open} setOpen={setOpen} Product={selectedProduct} />
      </div>
    </>
  );
};

export default ProductList;
