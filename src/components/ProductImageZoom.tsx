import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ZoomIn } from 'lucide-react';
import { PRODUCT_HOVER_IMAGES } from '../utils/productHoverImages';

interface ProductImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  initialScale?: number;
  zoomScale?: number;
  style?: React.CSSProperties;
  onLoad?: () => void;
  productId?: string;
  isParentHovered?: boolean;
}

export const ProductImageZoom: React.FC<ProductImageZoomProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  initialScale = 1.0,
  zoomScale,
  style,
  onLoad,
  productId,
  isParentHovered = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Hover and Touch Cycling State
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [isSingleCycling, setIsSingleCycling] = useState(false);
  
  const touchStartTimeRef = useRef<number>(0);
  const singleCycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initScale = initialScale;
  const targetScale = zoomScale ?? (initialScale * 2.2);

  // Get other images for the product sequence from utility
  const hoverImages = productId ? PRODUCT_HOVER_IMAGES[productId] : null;

  // Build the cycle images array (Index 0 is the static default display 'src' image, indices 1..N are the hover images sequence)
  const cycleImages = useMemo(() => {
    const imgs = [src];
    if (hoverImages && hoverImages.length > 0) {
      imgs.push(...hoverImages);
    }
    return imgs;
  }, [src, hoverImages]);

  const isCycling = Boolean(productId && (isHovered || isParentHovered || isTouchActive || isSingleCycling));

  // Pre-load images inside cycleImages array dynamically on mount
  useEffect(() => {
    if (!productId || !cycleImages) return;
    cycleImages.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
    });
  }, [productId, cycleImages]);

  // Handle continuous cycling interval (loops through hover sequence indices 1 to maxHoverIndex)
  useEffect(() => {
    if (!productId) return;

    if (!isCycling || isSingleCycling) {
      if (!isSingleCycling) {
        setActiveCycleIndex(0);
      }
      return;
    }

    const maxHoverIndex = hoverImages ? hoverImages.length : 0;
    if (maxHoverIndex === 0) return;

    // Immediately switch to the first hover image (index 1) with no initial delay
    setActiveCycleIndex(1);

    const intervalId = setInterval(() => {
      setActiveCycleIndex((prev) => {
        if (prev <= 0 || prev >= maxHoverIndex) {
          return 1;
        }
        return prev + 1;
      });
    }, 1000); // 1.0s delay for subsequent images (0.5s faster)

    return () => {
      clearInterval(intervalId);
    };
  }, [productId, isCycling, isSingleCycling, hoverImages]);

  // Handle mobile simple tap auto-cycle once fallback
  useEffect(() => {
    if (!isSingleCycling) return;

    const maxHoverIndex = hoverImages ? hoverImages.length : 0;
    if (maxHoverIndex === 0) {
      setIsSingleCycling(false);
      return;
    }

    // Immediately start with step 1
    setActiveCycleIndex(1);
    let step = 1;
    const interval = setInterval(() => {
      step++;
      if (step <= maxHoverIndex) {
        setActiveCycleIndex(step);
      } else {
        setActiveCycleIndex(0);
        setIsSingleCycling(false);
        clearInterval(interval);
      }
    }, 1000); // 1.0s delay for subsequent images

    return () => {
      clearInterval(interval);
    };
  }, [isSingleCycling, hoverImages]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || productId) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    setPointerPos({ x: clampedX, y: clampedY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Touch event fallbacks for mobile devices
  const handleTouchStart = () => {
    touchStartTimeRef.current = Date.now();
    setIsTouchActive(true);
    setIsSingleCycling(false);
  };

  const handleTouchEnd = () => {
    const duration = Date.now() - touchStartTimeRef.current;
    setIsTouchActive(false);

    // If quick tap (duration < 300ms), trigger a single shot cycle once
    if (duration < 300) {
      setIsSingleCycling(true);
      setActiveCycleIndex(0);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`relative overflow-hidden cursor-crosshair select-none ${containerClassName}`}
      style={{ isolation: 'isolate' }}
    >
      {/* Preload hidden images directly in DOM */}
      {productId && (
        <div className="hidden" aria-hidden="true">
          {cycleImages.map((imgSrc, idx) => (
            <img key={idx} src={imgSrc} alt="" referrerPolicy="no-referrer" />
          ))}
        </div>
      )}

      {/* Visual Cue: Magnifying Glass overlay when not hovered, disabled for card cycling */}
      {!isHovered && !productId && (
        <div className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-sm p-1.5 rounded-full shadow-md border border-platinum-gray/40 text-charcoal-matte/60 z-10 pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:text-heritage-red group-hover:bg-white flex items-center justify-center">
          <ZoomIn size={14} />
        </div>
      )}

      {/* Detail zoom instruction banner, disabled for card cycling */}
      {!productId && (
        <div 
          className={`absolute top-2.5 right-2.5 bg-charcoal-matte/85 backdrop-blur-sm text-white px-2 py-1 rounded text-[9px] font-sans font-medium tracking-wide pointer-events-none z-10 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
          }`}
        >
          Detail Zoom Active
        </div>
      )}

      <div
        className="w-full h-full flex items-center justify-center relative"
        style={{
          transform: isHovered && !productId ? `scale(${targetScale})` : `scale(${initScale})`,
          transformOrigin: `${pointerPos.x}% ${pointerPos.y}%`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out, transform-origin 0.2s ease-out',
        }}
      >
        {productId ? (
          cycleImages.map((imgSrc, idx) => {
            const isVisible = idx === activeCycleIndex;
            return (
              <img
                key={idx}
                src={imgSrc}
                alt={alt}
                referrerPolicy="no-referrer"
                className={`${className} absolute inset-0 m-auto transition-opacity duration-200 ease-in-out pointer-events-none`}
                style={{
                  ...style,
                  opacity: isVisible ? 1 : 0,
                  zIndex: isVisible ? 2 : 1,
                  mixBlendMode: (imgSrc?.includes('googleusercontent.com') || imgSrc?.includes('hc-frypan')) ? 'multiply' : undefined
                }}
                onLoad={onLoad}
              />
            );
          })
        ) : (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            className={`${className} pointer-events-none`}
            style={{
              ...style,
              mixBlendMode: (src?.includes('googleusercontent.com') || src?.includes('hc-frypan')) ? 'multiply' : undefined
            }}
            onLoad={onLoad}
          />
        )}
      </div>
    </div>
  );
};
