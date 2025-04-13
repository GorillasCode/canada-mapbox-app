import { createContext, useContext, useState, ReactNode } from "react";
import mapboxgl from "mapbox-gl";

interface MapboxContextType {
  map: mapboxgl.Map | null;
  setMap: (mapInstance: mapboxgl.Map) => void;
  center: [number, number];
  setCenter: (center: [number, number]) => void;
  token: string;
  demographicData: DemographicData;
  setDemographicData: (data: DemographicData) => void;
  tilesetId: string;
}

export interface DemographicData {
  population: number;
  income: number;
  medianAge: number;
  saturation: number;
  practicesNearby: number;
  employees: number;
  homeOwnership: number;
  englishSpeaking: number;
  growth: number;
  avgHouseholdSize: number;
  feeIndex: string;
  searchIndex: string;
  province: string;
} 

const MapboxContext = createContext<MapboxContextType | undefined>(undefined);

export const MapboxProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [demographicData, setDemographicData] = useState<DemographicData>({
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
    province: ''
  });
  const [center, setCenter] = useState<[number, number]>([-46.63, -23.55]); 
  const token = process.env.REACT_APP_MAPBOX_TOKEN!;
  const tilesetId = process.env.REACT_APP_MAPBOX_TILESETID!

  return (
    <MapboxContext.Provider value={{ map, setMap, center, setCenter, token, demographicData, setDemographicData, tilesetId }}>
      {children}
    </MapboxContext.Provider>
  );
};

export const useMapbox = () => {
  const context = useContext(MapboxContext);
  if (!context) {
    throw new Error("useMapboxError");
  }
  return context;
};
