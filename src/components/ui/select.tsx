import React, { useState } from "react";

export function Select({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return (
    <button className="w-full border border-gray-300 rounded px-3 py-2 text-left text-sm bg-white">
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <span className="text-gray-500">{placeholder}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute mt-2 w-full border border-gray-300 rounded bg-white shadow z-10">
      {children}
    </div>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      className={`px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm ${selected ? "font-semibold" : ""}`}
      onClick={() => setSelected(true)}
    >
      {children}
    </div>
  );
}