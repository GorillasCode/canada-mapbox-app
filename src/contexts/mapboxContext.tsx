import { createContext, useContext, useState, ReactNode } from "react";
import mapboxgl from "mapbox-gl";

interface MapboxContextType {
  map: mapboxgl.Map | null;
  setMap: (mapInstance: mapboxgl.Map) => void;
  center: [number, number];
  setCenter: (center: [number, number]) => void;
  token: string;
}

const MapboxContext = createContext<MapboxContextType | undefined>(undefined);

export const MapboxProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [center, setCenter] = useState<[number, number]>([-46.63, -23.55]); 
  const token = process.env.REACT_APP_MAPBOX_TOKEN!;

  return (
    <MapboxContext.Provider value={{ map, setMap, center, setCenter, token }}>
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
