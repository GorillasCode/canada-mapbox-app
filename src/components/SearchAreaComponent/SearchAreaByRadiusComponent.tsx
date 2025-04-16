import { useMapbox } from "../../contexts/mapboxContext";


export function SearchAreaByRadiusComponent() {
  const { radius, setRadius, searchByRadius, setSearchByRadius} = useMapbox();

  return (
    <div>
      <label htmlFor="radius-slider" className="block text-sm font-medium mb-1">
        Search Radius: {radius} miles
      </label>
      <input
        id="radius-slider"
        type="range"
        className="w-full accent-red-600 cursor-pointer "
        min={1}
        max={10000}
        step={1}
        value={radius}
        disabled={!searchByRadius}
        onChange={(e) => setRadius(Number(e.target.value))}
      />
    </div>
  );
}
