import { useEffect, useRef } from "react";
import { useMapbox } from "../../contexts/mapboxContext";
import geojsonData from "../../geojson/canada_dentists.geojson";
import mapboxgl from "mapbox-gl";
import { Card, CardContent } from "../ui/card";

export function MapViewComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { token, setDemographicData, setMap, tilesetId } = useMapbox();

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
      mapInstance.loadImage("/tooth-icon.png", (error, image) => {
        if (error || !image) {
          console.error("Erro ao carregar o ícone:", error);
          return;
        }

        if (!mapInstance.hasImage("tooth-icon")) {
          mapInstance.addImage("tooth-icon", image);
        }

        mapInstance.addSource("my-geojson", {
          type: "geojson",
          data: geojsonData,
        });

        mapInstance.addLayer({
          id: "my-geojson-layer",
          type: "symbol",
          source: "my-geojson",
          layout: {
            "icon-image": "tooth-icon",
            "icon-size": [
              "interpolate",
              ["linear"],
              ["zoom"],
              3, 0.018,    
              12, 0.03
            ],
            "icon-allow-overlap": true,
          },
        });

        mapInstance.moveLayer("my-geojson-layer");

        mapInstance.on("click", "my-geojson-layer", (e) => {
          const feature = e.features?.[0];
          if (!feature) return;

          const { geometry, properties = {} } = feature;

          if (geometry.type === "Point") {
            const [lng, lat] = geometry.coordinates as [number, number];

            const popupContent = `
              <div style="
                font-family: sans-serif;
                font-size: 14px;
                line-height: 1.4;
                color: #333;
                min-width: 200px;">
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
    });

    return () => {
      mapInstance.remove();
    };
  }, [token, tilesetId, setDemographicData, setMap]);

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