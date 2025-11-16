import React from "react";

export default function Badge({ children, className = "" }) {
  return (
    <span className={`inline-block text-xs px-2 py-1 rounded-full bg-purple-500 text-white ${className}`}>
      {children}
    </span>
  );
}
