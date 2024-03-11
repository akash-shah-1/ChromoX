import React,{useState} from "react";
import styled, { keyframes } from "styled-components";
import Carousel from 'react-material-ui-carousel'


// Define the keyframe animation
const flashAnimation = keyframes`
  0%, 100% {
    opacity: 0.5;
    transform: translateX(-100%);
  }
  100% {
    opacity: 0.1;
    transform: translateX(100%);
  }
`;

// Styled component for the loader
const Loader = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;
  animation: ${flashAnimation} 2s infinite;
`;


const ProductImages = ({ img }) => {
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
    <div>
      {!img ? (
        <div className="mx-auto mt-6  max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 bg-gray-100 aspect-w-3 hidden overflow-hidden rounded-lg lg:block relative">
            <Loader />
          </div>

          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <div
                className="loader bg-gray-100"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              >
                <Loader />
              </div>
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <div
                className="loader bg-gray-100"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              ><Loader /></div>
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <div
              className="loader bg-gray-100"
              style={{ height: "100%", width: "100%" }}
            ><Loader /></div>
          </div>
        </div>
      ) : (
        <>
      
        </>
      )}
    </div>
  );
};

export default ProductImages;
