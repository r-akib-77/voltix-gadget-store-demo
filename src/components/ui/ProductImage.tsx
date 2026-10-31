"use client";

import Image from "next/image";
import { useState } from "react";

const PLACEHOLDER = "/product-placeholder.svg";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Product imagery with a graceful local fallback — a broken remote URL
 * swaps to /product-placeholder.svg so cards never render empty boxes.
 */
export function ProductImage({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 50vw",
  priority = false,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={failed ? PLACEHOLDER : src}
      alt={failed ? "Product image unavailable" : alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={80}
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
