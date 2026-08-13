'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * React-based slideshow (replaces jQuery Nivo Slider).
 * Displays each image at its natural aspect ratio — never stretched or cropped.
 * Features spectacular direction-aware transitions + Ken Burns zoom.
 */
export default function Slideshow({ images, interval = 4000, className = '' }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dims, setDims] = useState({});
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const handleLoad = (src, naturalWidth, naturalHeight) => {
    if (!naturalWidth || !naturalHeight) return;
    setDims((prev) => ({ ...prev, [src]: { naturalWidth, naturalHeight } }));
  };

  // Autoplay
  useEffect(() => {
    if (paused || images.length <= 1) return;
    timerRef.current = setTimeout(goNext, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, interval, goNext, images.length]);

  // Compute the viewport height so the current image is shown at natural aspect ratio.
  const currentDims = dims[images[current].src];
  const containerWidth = containerRef.current?.clientWidth;
  const viewportHeight = currentDims
    ? containerWidth * (currentDims.naturalHeight / currentDims.naturalWidth)
    : undefined;

  return (
    <div
      className={`react-slideshow ${className}`}
      ref={containerRef}
      style={viewportHeight ? { height: `${viewportHeight}px` } : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="slideshow-viewport" data-direction={direction}>
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`slide ${i === current ? 'active' : ''}`}
            role="group"
            aria-hidden={i !== current}
            aria-label={img.alt}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              onLoad={(e) =>
                handleLoad(img.src, e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)
              }
            />
            <div className="slide-caption">
              <span>{img.title}</span>
            </div>
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button className="slideshow-arrow prev" onClick={goPrev} aria-label="Previous slide">
            <span aria-hidden="true">&#10094;</span>
          </button>
          <button className="slideshow-arrow next" onClick={goNext} aria-label="Next slide">
            <span aria-hidden="true">&#10095;</span>
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="slideshow-controls">
          {images.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
            />
          ))}
        </div>
      )}
    </div>
  );
}