import { useEffect, useRef } from "react";
import { useMapbox } from "../../contexts/mapboxContext";
import mapboxgl from "mapbox-gl";
import { Card, CardContent } from "../ui/card";


export function MapViewComponent() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { map, setMap, center, token } = useMapbox();

    mapboxgl.accessToken = token; 
    
    useEffect(() => {
        if (!mapContainerRef.current) return;
    
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/light-v10",
          center: [-106.3468, 56.1304],
          zoom: 3
        });

        return () => map.remove();
    }, [map, center, token, setMap]);


    return (
        <Card>
          <CardContent className="p-4">
            <div
              ref={mapContainerRef}
              className="bg-gray-200 h-96 rounded flex items-center justify-center text-gray-500"
            ></div>
          </CardContent>
        </Card>
      );
}
