import React from "react";

interface InfoRowProps {
  icon: React.ReactElement;
  label: string;
  value: string;
}

export function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-800">
      <span className="text-red-600">{icon}</span>
      <span>
        <strong className="text-red-600">{label}:</strong> {value}
      </span>
    </div>
  );
}
