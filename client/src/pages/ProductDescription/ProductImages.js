import React from "react";
import styled, { keyframes } from "styled-components";

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
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img src={img} alt={img} />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img src={img} alt={img} style={{ objectFit: "cover" }} />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img src={img} alt={img} style={{ objectFit: "cover" }} />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img src={img} alt={img} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImages;
