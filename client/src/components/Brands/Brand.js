import React, { useEffect, useRef } from "react";
import brandData from "./brandData";
import styled, { keyframes } from 'styled-components';

const Brand = () => {
  const scrollerInnerRef = useRef(null);

  useEffect(() => {
    const scrollerContent = Array.from(scrollerInnerRef.current.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerInnerRef.current.appendChild(duplicatedItem);
    });
  }, []);

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-10xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="mx-auto mt-10 overflow-hidden">
            <ScrollerInner ref={scrollerInnerRef}>
              {brandData.map((logo, index) => (
                <LogoContainer key={index}>
                  <img
                    className="max-h-12 w-full object-contain"
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    width={158}
                    height={48}
                  />
                </LogoContainer>
              ))}
            </ScrollerInner>
          </div>
          <div className="mx-auto mt-10 overflow-hidden">
            <ScrollerInner2 ref={scrollerInnerRef}>
              {brandData.map((logo, index) => (
                <LogoContainer key={index}>
                  <img
                    className="max-h-12 w-full object-contain"
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    width={158}
                    height={48}
                  />
                </LogoContainer>
              ))}
            </ScrollerInner2>
          </div>
        </div>
      </div>
    </>
  );
};

const scrollX = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const ScrollerInner = styled.div`
  display: flex;
  animation: ${scrollX} 30s linear infinite;
`;

const scroll = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;
const ScrollerInner2 = styled.div`
  display: flex;
  animation: ${scroll} 30s linear infinite;
`;

const LogoContainer = styled.div`
  flex-shrink: 0;
  padding-right: 2rem; /* Adjust as needed */
`;

export default Brand;
