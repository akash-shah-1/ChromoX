
import React, { useEffect,useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import product from './dummyData'
import ProductImages from './ProductImages'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { publicRequest } from '../../RequestMethods/Requests'
import ProductList from '../products/ProductList/ProductList'
import SuggestionProducts from './Suggestions/SuggestionProducts'
import styled from 'styled-components';


const ScrollableDiv = styled.div`
  height: 90vh;
  overflow-y: auto;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px; 
  }

  // &::-webkit-scrollbar-track {
  //   background: #f1f1f1; 
  // }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Description = () => {

  const location = useLocation();
  const productId = location.pathname.split('/')[3];
  const Subject = location.pathname.split('/')[2];
  const [Product,setProduct] = useState({});

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  useEffect(()=>{
   const getProduct = async()=>{
    try {
      const response = await publicRequest.get('/product/find/'+productId)
      setProduct(response.data.ProductInfo)
      console.log("My product",Product)
  } catch (error) { 
    console.log(error)
  }
   }
   getProduct();
  },[productId])

  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1567225477277-c8162eb4991d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBhaW50aW5ncyUyMHdpdGglMjBmcmFtZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFpbnRpbmdzJTIwd2l0aCUyMGZyYW1lfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1567225477277-c8162eb4991d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBhaW50aW5ncyUyMHdpdGglMjBmcmFtZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFpbnRpbmdzJTIwd2l0aCUyMGZyYW1lfGVufDB8fDB8fHww',
  
    // Add more image URLs as needed
  ];

  const changeImage = (index) => {
    setCurrentImage(index);
  };
  
  return (
    <div className="bg-white" style={{ marginTop:"6rem" }}>
      <div className="pt-6">
        {/* Image gallery */}
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-3 px-4">
          <div className="h-full  md:h-2/3 rounded-lg bg-gray-100 mb-4">
            <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} className="h-full w-full object-cover rounded-lg" />
          </div>

          <div className="flex -mx-2 mb-4">
            {images.map((image, index) => (
              <div key={index} className="flex-1 px-2">
                <button onClick={() => changeImage(index)} className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${currentImage === index ? 'ring-2 ring-indigo-300 ring-inset' : ''}`}>
                <img src={images[index]} alt={`Image ${currentImage + 1}`} className="h-full w-full object-cover rounded-lg" />
                </button>
              </div>
            ))}
          </div>
        </div>


          {/* Product info */}
          <div className=" max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-full lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{Product.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{Product.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>
            <form className="mt-10">
              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{Product.desc}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">{Product.style}</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">{Product.medium}</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">{Product.subject}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{Product.desc}</p>
              </div>
            </div>
          </div>
        </div>

          <div className='hidden xl:block'>
          <ScrollableDiv>
            <SuggestionProducts subject = {Subject} />
            </ScrollableDiv>
          </div>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Description