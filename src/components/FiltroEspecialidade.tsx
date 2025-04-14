import React, { useState } from 'react';
import './FiltroEspecialidade.css';

const SPECIALTIES = [
  'General Dentist',
  'Orthodontist',
  'Pediatric Dentist',
  'Oral Surgeon',
  'Endodontist',
  'Periodontist',
];

interface Props {
  selected: string[];
  onChange: (newList: string[]) => void;
}

export default function SpecialtyFilterDropdown({ selected, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const toggleSpecialty = (name: string) => {
    const updated = selected.includes(name)
      ? selected.filter((s) => s !== name)
      : [...selected, name];
    onChange(updated);
  };

  return (
    <div className="container-filtro">
      <button
        onClick={() => setOpen(!open)}
        className="btn-toggle"
      >
        Specialties
      </button>

      {open && (
        <div className="menu">
          <span className="titulo-menu">Specialties</span>
          {SPECIALTIES.map((s) => (
            <label key={s} className="item-especialidade">
              <input
                type="checkbox"
                checked={selected.includes(s)}
                onChange={() => toggleSpecialty(s)}
              />
              {s}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
