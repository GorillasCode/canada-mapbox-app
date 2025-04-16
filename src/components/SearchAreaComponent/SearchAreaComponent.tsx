
import { SearchAreaByPlaceComponent } from "./SearchAreaByPlaceComponent";
import { SearchAreaByRadiusComponent } from "./SearchAreaByRadiusComponent";

export function SearchAreaComponent() {

  return (
    
    <div className="space-y-4">
      {/* Type Place Search */}
      <SearchAreaByPlaceComponent />

      {/* Radius Search */}
      <SearchAreaByRadiusComponent />
      
    </div>
  );
}
