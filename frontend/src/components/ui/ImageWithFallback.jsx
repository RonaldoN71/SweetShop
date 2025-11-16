import React, { useState } from "react";

export default function ImageWithFallback({ src, alt = "", className = "", fallback = null, ...props }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    return fallback ? <img src={fallback} alt={alt} className={className} {...props} /> : <div className={`${className} bg-gray-100`} />;
  }
  return (
    <img src={src} alt={alt} className={className} onError={() => setErr(true)} {...props} />
  );
}
