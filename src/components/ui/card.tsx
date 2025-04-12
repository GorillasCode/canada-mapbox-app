import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
    return <div className="rounded-2xl shadow p-1 bg-white">{children}</div>;
  }
  
export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
}