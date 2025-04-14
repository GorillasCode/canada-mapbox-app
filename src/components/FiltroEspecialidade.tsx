import React from "react";

interface Props {
    onSelect: (value:string | null) => void;
}

export default function SpecialtyFilterCard({ onSelect }: Props) {
    return (
          <select
            id="specialty"
            className="border border-gray-300 rounded-md px-3 py-1 w-full"
            onChange={(e) => onSelect(e.target.value || null)}
          >
            <option value="">All</option>
            <option value="Orthodontics">Orthodontics</option>
            <option value="Periodontics">Periodontics</option>
            <option value="Pediatric Dentistry">Pediatric Dentistry</option>
            <option value="Endodontics">Endodontics</option>
            <option value="Prosthodontics">Prosthodontics</option>
            <option value="Implantology">Implantology</option>
          </select>
    )
}