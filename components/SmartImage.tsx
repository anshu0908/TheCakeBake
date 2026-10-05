"use client";
import Image from "next/image";
import { useState } from "react";

/** Fill-style image with a graceful gradient fallback. Parent must be `relative` with a size/aspect ratio. */
export default function SmartImage({
  src, alt, className = "", sizes = "(max-width: 768px) 100vw, 50vw", priority = false,
}: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div role="img" aria-label={alt} className="absolute inset-0 bg-gradient-to-br from-blush-100 via-cream-200 to-gold-300/60" />;
  }
  return (
    <Image
      src={src} alt={alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : "lazy"}
      className={`object-cover ${className}`} onError={() => setFailed(true)}
    />
  );
}
