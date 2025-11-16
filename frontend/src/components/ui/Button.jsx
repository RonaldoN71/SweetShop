import React from "react";

export default function Button({
  children,
  className = "",
  variant = "primary",
  disabled = false,
  ...props
}) {
  // variants: primary (pink-purple gradient), secondary (light), outline, destructive, black
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition";
  const variants = {
    primary:
      "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow hover:from-pink-600 hover:to-violet-700",
    secondary: "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50",
    outline: "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-50",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    black: "bg-gray-700 text-white hover:bg-gray-800",
  };
  const disabledCls = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";
  const cls = `${base} ${variants[variant] || variants.primary} ${disabledCls} ${className}`;
  return (
    <button className={cls} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
