import { DemographicSnapshotComponent } from "../DemographicSnapshotComponent/DemographicSnapshotComponent";
import { SearchAreaComponent } from "../SearchAreaComponent/SearchAreaComponent";

export function SearchAndMetricsSectionComponent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Search Area */}
      <SearchAreaComponent />

      {/* Demographic Snapshot */}
      <DemographicSnapshotComponent />
    </div>
  );
}
