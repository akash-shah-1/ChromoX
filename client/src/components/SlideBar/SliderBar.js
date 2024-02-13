import React, { useState, useRef, useEffect } from 'react';
import './SliderBar.css'; // Import CSS for styling

const SliderBar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const sliderRef = useRef(null);

  const categories = [
    'Abstract Paintings',
    'Landscape Paintings',
    'Portrait Paintings',
    'Still Life Paintings',
    'Modern Art',
    'Contemporary Art',
    'Impressionist Paintings',
    'Expressionist Paintings',
    'Realist Paintings',
    'Pop Art',
    'Surrealist Paintings',
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0; // Reset scroll position on component mount
    }
  }, []);

  return (
    <div className="slider-bar-container hidden sm:block">
      <ul className="slider-bar" ref={sliderRef}>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`slider-bar-item ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderBar;
