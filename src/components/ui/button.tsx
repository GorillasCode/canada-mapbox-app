import React from "react";

export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "search";
}) {
  const baseStyle = "px-4 py-2 rounded text-sm font-medium transition";
  const variants = {
    default: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-red-600 text-red-600 hover:bg-red-100",
    search: "bg-red-400 text-white hover:bg-red-600"
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
