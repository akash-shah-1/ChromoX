import React,{useEffect, useState} from 'react'
import { publicRequest } from '../../../RequestMethods/Requests';
import { Link } from "react-router-dom";
import QuickView from '../../products/ProductList/QuickView/QuickView';

const SuggestionProducts = ({subject}) => {

    
  const [Products,setProduct] = useState([]);

    useEffect(()=>{
        const getProduct = async()=>{
         try {
           const response = await publicRequest.get('/product/'+subject)
        //    setProduct(response.data.ProductInfo)
           console.log("My product",Products)
           setProduct(response.data)
       } catch (error) { 
         console.log(error)
       }
        }
        getProduct();
       },[subject])

       const [selectedProduct, setSelectedProduct] = useState({});
       const [open, setOpen] = useState(false);
       const handleShow = (product) => {
         setOpen(true);
         setSelectedProduct(product);
       };

  return (
    <>
    <div className="mx-auto max-w-2xl  px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Suggestions for you </h2>

    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 xl:gap-x-8">
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
  </div>
  <QuickView open={open} setOpen={setOpen} Product={selectedProduct} />
</>
  )
}

export default SuggestionProducts