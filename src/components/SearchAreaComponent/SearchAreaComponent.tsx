import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { Select } from "../ui/select";
import { DemographicData, useMapbox } from "../../contexts/mapboxContext";

import statistics from "../../geojson/canada_statistics.json";

export function SearchAreaComponent() {
  const { setDemographicData } = useMapbox();

  const [province, setProvince] = useState("");

  const handleProvinceChange = (e: SelectChangeEvent) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);

    const selectedData = statistics.find(
      (data: DemographicData) => data.province.toLocaleLowerCase() === selectedProvince.toLocaleLowerCase()
    );

    if (selectedData) {
      setDemographicData(selectedData);
    } else {
      setDemographicData({
        population: 0,
        income: 0,
        medianAge: 0,
        saturation: 0,
        practicesNearby: 0,
        employees: 0,
        homeOwnership: 0,
        englishSpeaking: 0,
        growth: 0,
        avgHouseholdSize: 0,
        feeIndex: "$",
        searchIndex: "●○○○○",
        province: "",
      });
    }
  };

  const provinceOptions = [
    { label: "Ontario", value: "Ontario" },
    { label: "Quebec", value: "Quebec" },
    { label: "British Columbia", value: "British Columbia" },
    { label: "Alberta", value: "Alberta" },
    { label: "Newfoundland and Labrador", value: "Newfoundland and Labrador" },
    { label: "Saskatchewan", value: "Saskatchewan" },
    { label: "Manitoba", value: "Manitoba" },
    { label: "Nova Scotia", value: "Nova Scotia" },
    { label: "New Brunswick", value: "New Brunswick" },
    { label: "Prince Edward Island", value: "Prince Edward Island" },
    { label: "Yukon", value: "Yukon" },
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
