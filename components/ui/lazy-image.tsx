"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface LazyImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
}

export function LazyImage({ src, alt, className, ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    // biome-ignore lint/performance/noImgElement: Using img for lazy loading
    // biome-ignore lint/correctness/useImageSize: Size is not required here
    <motion.img
      alt={alt}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      className={className}
      initial={{ opacity: 0 }}
      loading="lazy"
      onLoad={handleLoad}
      ref={imgRef}
      src={src}
      transition={{ duration: 0.5 }}
      {...props}
    />
  );
}
