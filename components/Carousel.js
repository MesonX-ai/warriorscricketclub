'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const REMOVE_DELAY = 800; // keep the outgoing slide mounted while it fades out

/**
 * ImageCarousel
 *
 * A dependency-free React carousel. It renders a main picture with a
 * clickable thumbnail "image reel" beneath it, plus prev/next controls,
 * autoplay (auto-paused while hovering or focused), and left/right keyboard
 * navigation. Used by the HCL Photo Gallery page to replace the legacy
 * MooTools/MooFlow gallery.
 *
 * Slide transitions are a premium cross-dissolve: the outgoing image fades to
 * 0 (with its Ken Burns frame frozen) while the incoming image fades in and
 * begins its own slow Ken Burns zoom. Captions and the counter slide in fresh
 * on every advance.
 *
 * Props:
 *  - images:  Array<{ src, alt, title? }>
 *  - autoplay: boolean (default true)
 *  - interval: ms between auto-advances (default 4500)
 *  - className: optional extra class for the wrapper
 */
export default function ImageCarousel({
  images,
  autoplay = true,
  interval = 4500,
  className = '',
}) {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(null); // index of the slide fading out
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const reelRef = useRef(null);
  const slideCount = images.length;

  const goNext = useCallback(() => {
    setExiting(current);
    setCurrent((p) => (p + 1) % slideCount);
  }, [current, slideCount]);

  const goPrev = useCallback(() => {
    setExiting(current);
    setCurrent((p) => (p - 1 + slideCount) % slideCount);
  }, [current, slideCount]);

  const goTo = useCallback(
    (i) => {
      setExiting(current);
      setCurrent(i);
    },
    [current],
  );

  // Autoplay, paused while the user is interacting with the carousel.
  useEffect(() => {
    if (!autoplay || slideCount <= 1 || paused) return;
    timerRef.current = setTimeout(goNext, interval);
    return () => clearTimeout(timerRef.current);
  }, [current, paused, autoplay, interval, goNext, slideCount]);

  // Drop the outgoing slide once its fade-out has completed.
  useEffect(() => {
    if (exiting === null) return;
    const id = setTimeout(() => setExiting(null), REMOVE_DELAY);
    return () => clearTimeout(id);
  }, [exiting]);

  // Preload every image so slide transitions never flash empty.
  useEffect(() => {
    images.forEach((img) => {
      const preload = new Image();
      preload.src = img.src;
    });
  }, [images]);

  // Keep the active thumbnail centred in the scrollable reel.
  useEffect(() => {
    const active = reelRef.current?.querySelector('.carousel-thumb--active');
    active?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [current]);

  const handleKeyDown = (e) => {
    if (e.altKey) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  const activeImage = images[current];

  // Render the active slide plus the outgoing slide while transitioning.
  const layers = exiting === null ? [current] : [exiting, current];

  return (
    <div
      className={`image-carousel ${className}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label="Herndon Cricket League photo gallery"
      tabIndex={slideCount > 1 ? 0 : -1}
      onKeyDown={slideCount > 1 ? handleKeyDown : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-stage">
        {layers.map((idx) => {
          const img = images[idx];
          const isActive = idx === current;
          return (
            <img
              key={img.src}
              className={
                'carousel-main ' + (isActive ? 'carousel-main--active' : 'carousel-main--exit')
              }
              src={img.src}
              alt={isActive ? img.alt : ''}
              loading={isActive ? 'eager' : 'lazy'}
              draggable={false}
            />
          );
        })}
        {activeImage.title && (
          <div
            key={current}
            className="carousel-caption"
            aria-live="polite"
            aria-atomic="true"
          >
            {activeImage.title}
          </div>
        )}
        <div key={current} className="carousel-counter" aria-live="polite">
          {current + 1} / {slideCount}
        </div>

        {slideCount > 1 && (
          <>
            <button
              type="button"
              className="carousel-nav carousel-nav--prev"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <span aria-hidden="true">&#10094;</span>
            </button>
            <button
              type="button"
              className="carousel-nav carousel-nav--next"
              onClick={goNext}
              aria-label="Next image"
            >
              <span aria-hidden="true">&#10095;</span>
            </button>
          </>
        )}
      </div>

      {slideCount > 1 && (
        <div className="carousel-reel" ref={reelRef}>
          {images.map((img, i) => (
            <button
              type="button"
              key={img.src}
              className={`carousel-thumb ${i === current ? 'carousel-thumb--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1} of ${slideCount}`}
              aria-current={i === current ? 'true' : undefined}
            >
              <img src={img.src} alt="" loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
