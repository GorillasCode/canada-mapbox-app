import { useEffect, useRef } from "react";
import { DemographicData, useMapbox } from "../../contexts/mapboxContext";
import geojsonData from "../../geojson/canada_dentists.geojson";
import statistics from "../../geojson/canada_statistics.json";
import mapboxgl from "mapbox-gl";
import { Card, CardContent } from "../ui/card";


const statisticsData: DemographicData[] = statistics;

async function fetchDemographicsByCoordinates() {
  const props = statisticsData[0];

  return {
    population: props.population,
    income: props.income,
    medianAge: props.medianAge,
    saturation: props.saturation,
    practicesNearby: props.practicesNearby,
    employees: props.employees,
    homeOwnership: props.homeOwnership,
    englishSpeaking: props.englishSpeaking,
    growth: props.growth,
    avgHouseholdSize: props.avgHouseholdSize,
    feeIndex: props.feeIndex,
    searchIndex: props.searchIndex,
  };
}

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

    const updateDemographics = async () => {
      const data = await fetchDemographicsByCoordinates();
      if (data) setDemographicData(data);
    };

    mapInstance.on("load", () => {
      updateDemographics();
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
    });

    return () => mapInstance.remove();
  }, [token, tilesetId, setDemographicData, setMap]);
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
