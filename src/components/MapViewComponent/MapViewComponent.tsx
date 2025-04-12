import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Card, CardContent } from "../ui/card";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;

export function MapViewComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-106.3468, 56.1304],
      zoom: 3
    });

    return () => map.remove();
  }, []);

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
