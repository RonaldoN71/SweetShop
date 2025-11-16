import React, { useEffect, useState, useMemo } from "react";

// Static decorative emojis around the edges
const sweetDecor = [
  { emoji: "🍭", className: "top-10 left-8" },
  { emoji: "🍬", className: "top-20 right-10" },
  { emoji: "🧁", className: "bottom-20 left-12" },
  { emoji: "🍪", className: "bottom-10 right-16" },
  { emoji: "🍡", className: "top-1/2 left-4" },
];

// Emojis used for the floating background grid
const sweetGridDecor = ["🍩", "🍰", "🍫", "🍦", "🍮", "🍯"];

export default function DashboardLayout({
  title,
  subtitle,
  actions,
  widthClass = "max-w-6xl",
  children,
}) {
  // Emoji count varies by screen size
  const [iconCount, setIconCount] = useState(() => {
    if (typeof window === "undefined") return 36;
    const w = window.innerWidth;
    return w < 768 ? 12 : w < 1024 ? 24 : 36;
  });

  // Update emoji count on resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIconCount(w < 768 ? 12 : w < 1024 ? 24 : 36);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Random positions/styles for floating emoji backdrop
  const positions = useMemo(() => {
    return Array.from({ length: iconCount }).map(() => ({
      top: 5 + Math.random() * 90,
      left: 5 + Math.random() * 90,
      rotate: -20 + Math.random() * 40,
      scale: 0.8 + Math.random() * 0.8,
      opacity: 0.45 + Math.random() * 0.35,
    }));
  }, [iconCount]);

  return (
    <div
      className="relative min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top,#ffe3f6 0%,rgba(255,227,246,0) 40%), radial-gradient(circle at bottom,#e0f2ff 0%,rgba(224,242,255,0) 40%), linear-gradient(90deg,#fff5fb 0%, #f1f5ff 100%)",
      }}
    >
      {/* Static floating icons */}
      <div className="pointer-events-none absolute inset-0 opacity-50 text-4xl select-none">
        {sweetDecor.map((item, idx) => (
          <span
            key={idx}
            className={`absolute ${item.className} animate-float`}
            aria-hidden="true"
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Large emoji grid background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 text-4xl select-none">
        {positions.map((pos, i) => (
          <span
            key={`bg-${i}`}
            className="animate-float-slow absolute"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transform: `translate(-50%, -50%) rotate(${pos.rotate}deg) scale(${pos.scale})`,
              opacity: pos.opacity,
            }}
            aria-hidden="true"
          >
            {sweetGridDecor[i % sweetGridDecor.length]}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div className={`${widthClass} mx-auto px-6 py-10`}>
          <div className="relative z-10">
            {(title || subtitle || actions) && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                  {title && <h1 className="text-3xl font-semibold">{title}</h1>}
                  {subtitle && (
                    <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                      {subtitle}
                    </p>
                  )}
                </div>
                {actions && (
                  <div className="flex flex-wrap gap-3 justify-center">
                    {actions}
                  </div>
                )}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
