import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import { MapViewComponent } from "./components/MapViewComponent/MapViewComponent";
import { SearchAndMetricsSectionComponent } from "./components/SearchAndMetricsSectionComponent/SearchAndMetricsSectionComponent";
import { Button } from "./components/ui/button";

export default function DentalMarketExplorer() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <HeaderComponent />

      {/* Search & Metrics Section */}
      <SearchAndMetricsSectionComponent />

      {/* Map View */}
      <MapViewComponent />
    </div>
  );
}
