import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  text-align: center;
  grid-template-columns: repeat(4, 1fr);
`;

function Carousel({ photos }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Wrapper>
      <div style={{ width: '600px', margin: '0 auto' }}>
        <a
          href={photos[activeIndex]} // Use the large image as the href
          data-lightbox="product-gallery" // Group related images using the same data-lightbox attribute
          data-title="Product Images" // Optional title for the lightbox
        >
          <img
            alt="large"
            src={photos[activeIndex]}
            style={{ width: '100%', height: 'auto' }}
          />
        </a>
      </div>
      <div>
        {photos.map((p, i) => (
          <a
            href={p} // Use the small image as the href
            data-lightbox="product-gallery" // Group related images using the same data-lightbox attribute
            data-title="Product Images" // Optional title for the lightbox
            key={i}
          >
            <img
              alt="small"
              src={p}
              style={{
                height: '100px',
                opacity: activeIndex === i ? 0.3 : 1,
              }}
              onClick={() => setActiveIndex(i)}
            />
          </a>
        ))}
      </div>
    </Wrapper>
  );
}

export default Carousel;

