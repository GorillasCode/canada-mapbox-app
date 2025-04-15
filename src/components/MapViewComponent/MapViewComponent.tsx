import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useMapbox } from "../../contexts/mapboxContext";
import geojsonData from "../../geojson/canada_dentists.geojson";
import jsonPoints from "../../geojson/canada_dentists_points.json";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Select } from "../ui/select";

export function MapViewComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const { token, setDemographicData, setMap, tilesetId, map, searchByRadius, radius } = useMapbox();

  const [specialty, setSpeciality] = useState("");
  const [circleCenter, setCircleCenter] = useState<[number, number] | null>(null);
  mapboxgl.accessToken = token;

  function applySpecialtyFilter(map: mapboxgl.Map, specialty: string) {
    setSpeciality(specialty);
    if (specialty === "Specialty") {
      map.setFilter("my-geojson-layer", null);
    } else {
      map.setFilter("my-geojson-layer", [
        "==",
        ["get", "healthcare:speciality"],
        specialty.toLocaleLowerCase()
      ]);
    }
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!searchByRadius) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: [-106.3468, 56.1304],
        zoom: 3,
      });
  
      mapRef.current = mapInstance;
    }
  }, [searchByRadius])

  

  useEffect(() => {
    if (!mapRef.current) return;

    setMap(mapRef.current);
    const mapInstance = mapRef.current;

    mapInstance.on("load", () => {
      mapInstance.loadImage("/tooth-icon.png", (error, image) => {
        if (error || !image) {
          return;
        }

        if (!mapInstance.hasImage("tooth-icon")) {
          mapInstance.addImage("tooth-icon", image);
        }

        mapInstance.addSource("my-geojson", {
          type: "geojson",
          data: geojsonData
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
              3,
              0.018,
              12,
              0.03
            ],
            "icon-allow-overlap": true
          }
        });

        mapInstance.moveLayer("my-geojson-layer");

        mapInstance.on("click", "my-geojson-layer", e => {
          const feature = e.features?.[0];
          if (!feature) return;

          const { geometry, properties = {} } = feature;

          if (geometry.type === "Point") {
            if (geometry.type === "Point") {
              let [lng, lat] = geometry.coordinates as [number, number];

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
                <div><strong>Type:</strong> ${
                  properties?.healthcare || "N/A"
                }</div>
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
    
    if (searchByRadius) {
      mapInstance.on("click", e => {
        const center: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        setCircleCenter(center);
        const radiusInMiles = radius || 100;

        // Cria um círculo (buffer) em torno do ponto clicado
        const circle = turf.circle(center, radiusInMiles, {
          steps: 64,
          units: "miles"
        });

        // Atualiza ou adiciona a layer do círculo
        if (mapInstance.getSource("circle")) {
          (mapInstance?.getSource("circle") as mapboxgl.GeoJSONSource)?.setData(
            circle
          );
        } else {
          mapInstance.addSource("circle", {
            type: "geojson",
            data: circle
          });

          mapInstance.addLayer({
            id: "circle-layer",
            type: "fill",
            source: "circle",
            paint: {
              "fill-color": "#ff0000",
              "fill-opacity": 0.2
            }
          });
        }

        const points = turf.points(jsonPoints.points);

        // Filtra pontos dentro do raio
        const pointsWithin = turf.pointsWithinPolygon(points, circle);

        // Atualiza os pontos no mapa com os que estão dentro do raio
        (
          mapInstance.getSource("my-geojson") as mapboxgl.GeoJSONSource
        )?.setData(pointsWithin);
      });
    }

    // return () => mapInstance.remove();
  }, [token, tilesetId, setDemographicData, setMap, searchByRadius]);

  useEffect(() => {
    const mapInstance = mapRef.current;
  
    if (!searchByRadius || !circleCenter || !mapInstance ) {
      return;
    };
  
    const circle = turf.circle(circleCenter, radius, {
      steps: 64,
      units: "miles",
    });
  
    if (mapInstance.getSource("circle")) {
      (mapInstance.getSource("circle") as mapboxgl.GeoJSONSource).setData(circle);
    } else {
      mapInstance.addSource("circle", {
        type: "geojson",
        data: circle,
      });

      mapInstance.addLayer({
        id: "circle-layer",
        type: "fill",
        source: "circle",
        paint: {
          "fill-color": "#ff0000",
          "fill-opacity": 0.2,
        },
      });
    }
  
    const points = turf.points(jsonPoints.points);
    const pointsWithin = turf.pointsWithinPolygon(points, circle);
  
    (mapInstance.getSource("my-geojson") as mapboxgl.GeoJSONSource)?.setData(pointsWithin);
  }, [radius, searchByRadius ]);

  return (
    <Card>
      <div className="relative w-full">
        <div className="absolute top-4 right-4 flex flex-row space-x-2 opacity-20 hover:opacity-100 transition-opacity duration-300">
          <Button variant="outline">Save Location</Button>
          <Button>Export Snapshot PDF</Button>
        </div>

        {/* Select de especialidades */}
        <div className="w-56 p-4">
          <Select
            options={[
              { label: "All specialties", value: "Specialty" },
              { label: "General Dentist", value: "general" },
              { label: "Denturist", value: "denturist" },
              { label: "Orthodontics", value: "orthodontics" },
              { label: "Endodontics", value: "endodontics" },
              { label: "Dentist", value: "dentist" },
              { label: "Anaesthetics", value: "anaesthetics" },
              { label: "Dentistry", value: "dentistry" }
            ]}
            value={specialty}
            label="Specialties"
            onChange={e => applySpecialtyFilter(map!, e.target.value)}
          ></Select>
        </div>

        <CardContent className="p-4">
          <div
            ref={mapContainerRef}
            className="w-full h-[85vh] rounded relative"
          ></div>
        </CardContent>
      </div>
    </Card>
  );
}