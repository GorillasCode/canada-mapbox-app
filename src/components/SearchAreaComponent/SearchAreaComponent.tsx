import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { Select } from "../ui/select";
import { SearchInput } from "../ui/input";
import { Button } from "../ui/button";
import { DemographicData, useMapbox } from "../../contexts/mapboxContext";

import statistics from "../../geojson/canada_statistics.json";
import CustomPinkSwitch from "../ui/switch";

export function SearchAreaComponent() {
  const { setDemographicData, map, setMap, token, radius, setRadius, searchByRadius, setSearchByRadius} = useMapbox();

  const [province, setProvince] = useState("");
  const [searchName, setSearchName] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleProvinceChange = (e: SelectChangeEvent) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);
    setSearchName("");
    searchAddress(selectedProvince);

    const selectedData = statistics.find(
      (data: DemographicData) =>
        data.province.toLocaleLowerCase() ===
        selectedProvince.toLocaleLowerCase()
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
        province: ""
      });
    }
  };
  const searchAddress = async (address: string) => {
    if (!address) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${token}`
      );
      const data = await response.json();
      handleMetrics(data);
      console.log(data);
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;

        if (map) {
          map.flyTo({
            center: [lng, lat],
            zoom: 9,
            essential: true
          });
        }
      } else {
        alert("Endereço não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao geocodificar o endereço:", error);
    }
  };
  function handleSearchProvince() {
    searchAddress(searchName);
  }

  function handleMetrics(data: any) {
    let metrics;
    for (let i = 0; i < statistics.length; i++) {
      if (
        data.features[0].place_name
          .toLocaleLowerCase()
          .includes(statistics[i].province.toLocaleLowerCase())
      ) {
        metrics = statistics[i];
      }
    }
    if (metrics) {
      setDemographicData(metrics);
      setProvince(metrics.province);
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
        province: ""
      });
    }
  }

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = e.target;
    setSearchName(value);

    if (value.length > 2) {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            value
          )}.json?autocomplete=true&limit=5&access_token=${token}`
        );
        const data = await res.json();
        setSuggestions(data.features);
      } catch (err) {
        console.error("Erro ao buscar sugestões:", err);
      }
    } else {
      setSuggestions([]);
    }
  }

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
    { label: "Yukon", value: "Yukon" }
  ];

  const enableRadiusSearch = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setSearchByRadius(e.target.checked);

  }
  return (
    <div className="space-y-4">
      <SearchInput value={searchName} onChange={e => handleChange(e)} />
      {suggestions.length > 0 && (
        <ul className="bg-white border rounded shadow text-sm">
          {suggestions.map(suggestion => (
            <li
              key={suggestion.id}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setSearchName(suggestion.place_name);
                setSuggestions([]);
                searchAddress(suggestion.place_name);
              }}
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}

      <Select
        label="Select Province"
        value={province}
        onChange={handleProvinceChange}
        options={provinceOptions}
      />
      <Button variant="search" onClick={e => handleSearchProvince()}>
        Search
      </Button>
      <div className="flex items-center gap-4">
        <CustomPinkSwitch handleChange={enableRadiusSearch} label="Search By Radius " />

        <div>
          <label htmlFor="radius-slider" className="block text-sm font-medium mb-1">
            Search Radius: {radius} miles
          </label>
          <input
            id="radius-slider"
            type="range"
            className="w-full accent-red-600 cursor-pointer "
            min={10}
            max={500}
            step={1}
            value={radius}
            disabled={!searchByRadius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
        </div>

      </div>
      
    </div>
  );
}
