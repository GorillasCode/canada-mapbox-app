import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { Card, CardContent } from "../ui/card";
import { Select } from "../ui/select";

export function SearchAreaComponent() {
  const [province, setProvince] = useState("");

  const handleProvinceChange = (e: SelectChangeEvent) => {
    setProvince(e.target.value);
  };

  const provinceOptions = [
    { label: "Ontario", value: "ON" },
    { label: "Quebec", value: "QC" },
    { label: "British Columbia", value: "BC" },
    { label: "Alberta", value: "AB" },
    { label: "Newfoundland and Labrador", value: "NL" },
    { label: "Saskatchewan", value: "SK" },
    { label: "Manitoba", value: "MB" },
    { label: "Nova Scotia", value: "NS" },
    { label: "New Brunswick", value: "NB" },
    { label: "Prince Edward Island", value: "PE" },
    { label: "Yukon", value: "YT" }
  ];
  return (
    <div className="space-y-4">
      <Select
        label="Select Province"
        value={province}
        onChange={handleProvinceChange}
        options={provinceOptions}
      />
    </div>
  );
}
