import React from "react";

export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
}) {
  const baseStyle = "px-4 py-2 rounded text-sm font-medium transition";
  const variants = {
    default: "font-roboto bg-blue-600 text-white hover:bg-blue-700",
    outline: "font-roboto border border-blue-600 text-blue-600 hover:bg-blue-50"
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
