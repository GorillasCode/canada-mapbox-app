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

      {/* Export Options */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline">Save Location</Button>
        <Button>Export Snapshot PDF</Button>
      </div>
    </div>
  );
}
