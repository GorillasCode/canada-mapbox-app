import React from "react";
export function Input({ type = "text", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
      <input
        type={type}
        className="border border-gray-300 rounded px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    );
  }
  