import { HeaderComponent } from "./HeaderComponent/HeaderComponent";
import { MapViewComponent } from "./MapViewComponent/MapViewComponent";

export default function MainApp() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <HeaderComponent />

      {/* Map View */}
      <MapViewComponent />
    </div>
  );
}