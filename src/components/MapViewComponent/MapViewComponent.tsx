import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useMapbox } from "../../contexts/mapboxContext";
import geojsonData from "../../geojson/canada_dentists.geojson";
import jsonPoints from "../../geojson/canada_dentists_points.json";
import { Card, CardContent } from "../ui/card";

export function MapViewComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { token, setDemographicData, setMap, tilesetId } = useMapbox();
  const [searchByRadius, setSearchByRadius] = useState(true);
  mapboxgl.accessToken = token;

  useEffect(() => {
    
    if (!mapContainerRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-106.3468, 56.1304],
      zoom: 3,
    });

    setMap(mapInstance);

    mapInstance.on("load", () => {
      mapInstance.addSource("my-geojson", {
        type: "geojson",
        data: geojsonData,
      });

      mapInstance.addLayer({
        id: "my-geojson-layer",
        type: "circle",
        source: "my-geojson",
        paint: {
          "circle-radius": 6,
          "circle-color": "#007cbf",
        },
      });
      mapInstance.moveLayer("my-geojson-layer");
      
      mapInstance.on("click", "my-geojson-layer", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;
        
          const { geometry, properties = {} } = feature;

          if (geometry.type === "Point") {
            let [lng, lat] = geometry.coordinates as [number, number];

            const popupContent = `
              <div style="
                font-family: sans-serif;
                font-size: 14px;
                line-height: 1.4;
                color: #333;
                min-width: 200px;
              ">
                <div style="font-weight: bold; font-size: 15px; margin-bottom: 4px;">
                ${properties?.name || "Unknown Clinic"}
                </div>
                <div><strong>Type:</strong> ${properties?.healthcare || "N/A"}</div>
                <div><strong>ID:</strong> ${properties?.osm_id || "N/A"}</div>
                ${
                  properties?.website
                    ? `<div style="margin-top: 4px;"><a href="${properties.website}" target="_blank" rel="noopener noreferrer" style="color: #1a73e8; text-decoration: none;">Website</a></div>`
                    : ""
                }
              </div>
            `;
            const coordinates = geometry.coordinates as [number, number];

            new mapboxgl.Popup()
              .setLngLat([lng, lat])
              .setHTML(popupContent.trim())
              .addTo(mapInstance);
          }
      });

      mapInstance.on("mouseenter", "my-geojson-layer", () => {
        mapInstance.getCanvas().style.cursor = "pointer";
      });

      mapInstance.on("mouseleave", "my-geojson-layer", () => {
        mapInstance.getCanvas().style.cursor = "";
      });
    });

    if (searchByRadius) {
      mapInstance.on('click', (e) => {
        const center = [e.lngLat.lng, e.lngLat.lat];
        const radiusInMiles = 100;

        // Cria um círculo (buffer) em torno do ponto clicado
        const circle = turf.circle(center, radiusInMiles, {
          steps: 64,
          units: 'miles'
        });

        // Atualiza ou adiciona a layer do círculo
        if (mapInstance.getSource('circle')) {
          (mapInstance?.getSource('circle') as mapboxgl.GeoJSONSource)?.setData(circle);
        } else {
          mapInstance.addSource('circle', {
            type: 'geojson',
            data: circle
          });

          mapInstance.addLayer({
            id: 'circle-layer',
            type: 'fill',
            source: 'circle',
            paint: {
              'fill-color': '#ff0000',
              'fill-opacity': 0.2
            }
          });
        }

        const points = turf.points(jsonPoints.points);

        // Filtra pontos dentro do raio
        const pointsWithin = turf.pointsWithinPolygon(points, circle);

        // Atualiza os pontos no mapa com os que estão dentro do raio
        (mapInstance.getSource('my-geojson') as mapboxgl.GeoJSONSource)?.setData(pointsWithin);
      });
    }

    return () => mapInstance.remove();
  }, [token, tilesetId, setDemographicData, setMap, searchByRadius]);


  return (
    <Card>
      <CardContent className="p-4">
        <div
          ref={mapContainerRef}
          className="w-full h-96 rounded relative"
        ></div>
      </CardContent>
    </Card>
  );
}
