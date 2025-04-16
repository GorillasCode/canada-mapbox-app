import React from "react";
import Tooltip from '@mui/material/Tooltip';
export function Button({
  children,
  className = "",
  variant = "default",
  size = "md",
  tooltip = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "search";
  size?: "sm" | "md" | "lg";
  tooltip?: string;
}) {
  const baseStyle = "px-2 py-1 rounded font-medium transition";
  const variants = {
    default: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-red-600 text-red-600 hover:bg-red-100",
    search: "bg-red-400 text-white hover:bg-red-600"
  };

  if (tooltip) {
    return (
      <Tooltip title={tooltip} arrow>
        <button
          className={`${baseStyle} ${variants[variant]} ${className} text-${size}`}
          {...props}
        >
          {children}
        </button>
      </Tooltip>
    )
  } else {
    return (
      <button
        className={`${baseStyle} ${variants[variant]} ${className} text-${size}`}
        {...props}
      >
        {children}
      </button>
    );
  }
}
