import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import { MapViewComponent } from "./components/MapViewComponent/MapViewComponent";

export default function DentalMarketExplorer() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <HeaderComponent />

      {/* Map View */}
      <MapViewComponent />
    </div>
  );
}
