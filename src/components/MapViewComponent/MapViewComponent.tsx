import InsightsIcon from '@mui/icons-material/Insights';
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useMapbox } from "../../contexts/mapboxContext";
import geojsonData from "../../geojson/canada_dentists.geojson";
import jsonPoints from "../../geojson/canada_dentists_points.json";
import { DemographicSnapshotComponent } from "../DemographicSnapshotComponent/DemographicSnapshotComponent";
import { Button } from "../ui/button";
import CustomModal from "../ui/modal";
import { Select } from "../ui/select";
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { SearchAreaByPlaceComponent } from '../SearchAreaComponent/SearchAreaByPlaceComponent';
import { Slider } from '@mui/material';


export function MapViewComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const { 
    token, 
    setDemographicData, 
    setMap, 
    tilesetId, 
    map, 
    searchByRadius,
    setSearchByRadius, 
    radius,
    setRadius
   } = useMapbox();

  const [specialty, setSpeciality] = useState("Specialty");
  const [openInsightsModal, setOpenInsightsModal] = useState(false);
  const [currentCirclePlace, setCurrentCirclePlace] = useState<[number, number] | null>(null);
  const [openSearchAreaByPlaceModal, setOpenSearchAreaByPlaceModal] = useState(false);
  const [openSearchAreaByRadiusModal, setOpenSearchAreaByRadiusModal] = useState(false);
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

  // Create MAP instance
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

  }, [searchByRadius]);
  
  // Add dentist points to the map
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

  }, [token, tilesetId, setDemographicData, setMap, searchByRadius]);

  // Create Radius Search
  useEffect(() => {
    const mapInstance = mapRef.current;

    if (!mapInstance) return;
  
    if (!searchByRadius && mapInstance.getSource("circle")) {
      mapInstance.removeLayer("circle-layer");
      mapInstance.removeSource("circle");
      return;
    };

    if (searchByRadius) {
      mapInstance.on("click", e => {
        const center: [number, number] = [e.lngLat.lng, e.lngLat.lat];
    setCurrentCirclePlace(center);

    // Cria um círculo (buffer) em torno do ponto clicado
    const circle = turf.circle(center, radius, {
      steps: 64,
      units: "meters"
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
  }, [searchByRadius, radius]);

  // Update circle when radius changes
  useEffect(() => {
    const mapInstance = mapRef.current;

    if (!currentCirclePlace) return;

    const newSizeCircle = turf.circle(currentCirclePlace, radius, {
      steps: 64,
      units: "meters"
    });

    if (!mapInstance || !mapInstance.getSource("circle")) return;

    (mapInstance?.getSource("circle") as mapboxgl.GeoJSONSource)?.setData(
      newSizeCircle
    );

    const points = turf.points(jsonPoints.points);

    // Filtra pontos dentro do raio
    const pointsWithin = turf.pointsWithinPolygon(points, newSizeCircle);

    // Atualiza os pontos no mapa com os que estão dentro do raio
    (
      mapInstance.getSource("my-geojson") as mapboxgl.GeoJSONSource
    )?.setData(pointsWithin);

  }, [radius, currentCirclePlace]);


  function showModal(action: string) {

    switch (action) {
      case "Radius":
        setOpenSearchAreaByRadiusModal(!openSearchAreaByRadiusModal);
        break;
      case "Place": 
        setOpenSearchAreaByPlaceModal(!openSearchAreaByPlaceModal);
        break;
      case "Metrics":
        setOpenInsightsModal(!openInsightsModal);
        break;
      default:  
        break;
    }
  }

  function enableSearchAreByRadius() {
    setSearchByRadius(!searchByRadius);
  }

  const MapMenu = () => (
    <div className="w-full p-4" style={{position: "absolute", top: 0, left: 0, zIndex: 1, }}>

      <div className="flex items-center gap-4 mb-4">
        {/* Filter by specialist btn */}
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
        />

        {searchByRadius && (
          <Slider
            style={{color: "red"}}
            aria-label="Temperature"
            defaultValue={500}
            getAriaValueText={() => "radius"}
            valueLabelDisplay="auto"
            shiftStep={1000}
            step={500}
            marks
            min={500}
            max={50000}
            value={radius}
            onChange={(e, value) => setRadius(value as number)}
          />
        )}

        {/* Search By Radius btn */}
        <Button
          variant="outline"
          className={`${searchByRadius ? "hover:bg-gray-200 hover:text-red-600" : "hover:bg-red-600 hover:text-white"} ${searchByRadius ? "bg-red-600" : ""} ${searchByRadius ? "text-white" : "text-red-600"}`}
          onClick={enableSearchAreByRadius}
          tooltip='Search By Radius'
          >
            <LocationSearchingIcon />
        </Button>

        {/* Search By Place btn */}
        <Button
          variant="outline"
          className={`text-red-600 hover:bg-red-600 hover:text-white`}
          onClick={() => showModal("Place")}
          tooltip='Search By Places'
          >
            <SearchIcon />
        </Button>

        {/* Insight btn */}
        <Button
          variant="outline"
          className={`text-red-600 hover:bg-red-600 hover:text-white`}
          onClick={() => showModal("Metrics")}
          size='sm'
          tooltip='Show Insights'
          >
            <InsightsIcon />
        </Button>
      </div>

      <div>
      </div>
    </div>
  )

  return (
    <>
      {/* Metrics */}
      {openInsightsModal && (
        <CustomModal
          open={true}
          handleClose={() => setOpenInsightsModal(false)}
          child={<DemographicSnapshotComponent />}  
        />
      )}

      {/* SearchAreaByPlaceModal */}
      {openSearchAreaByPlaceModal && (
          <CustomModal 
              open={openSearchAreaByPlaceModal} 
              handleClose={() => setOpenSearchAreaByPlaceModal(false)} 
              child={<SearchAreaByPlaceComponent />} />
      )}

      <div style={{position: "relative", height: "80vh",transform: 'translateZ(0px)', flexGrow: 1, backgroundColor: "red"}}>
        <MapMenu />

        <div id="map" style={{width: "100%", height: "100%"}}>
            <div
              ref={mapContainerRef}
              className="w-full h-full"
              style={{position: "absolute", top: 0, left: 0}}
            ></div>
        </div>
        {/* <SpeedDialTooltipOpen /> */}
      </div>
    </>
  );
}