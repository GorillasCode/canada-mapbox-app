import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { mockData } from "../data/mockData";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;

export const CanadaRealEstateMap = () => {
  const mapContainer = useRef(null);
  const [selectedCity] = useState("Toronto");

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-106.3468, 56.1304],
      zoom: 3
    });

    map.on("load", () => {
      mockData.forEach(city => {
        new mapboxgl.Marker()
          .setLngLat([
            city.nome === "Toronto"
              ? -79.3832
              : city.nome === "Vancouver"
              ? -123.1207
              : -73.5673,
            city.nome === "Toronto"
              ? 43.6532
              : city.nome === "Vancouver"
              ? 49.2827
              : 45.5017
          ])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${
                city.nome
              }</h3><p>Preço médio: $${city.preco_medio.toLocaleString()}</p>`
            )
          )
          .addTo(map);
      });
      map.addSource("provinces", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/johan/world.geo.json/master/countries/CAN.geo.json"
      });

      map.addLayer({
        id: "province-borders",
        type: "line",
        source: "provinces",
        paint: {
          "line-color": "#007BFF",
          "line-width": 2
        }
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div ref={mapContainer} className="w-full  h-1/2 md:h-full" />
    </div>
  );
};
