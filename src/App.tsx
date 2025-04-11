import { CanadaRealEstateMap } from "./components/CanadaRealEstateMap";
import MenuTabs from "./components/MenuTabs";

export default function App() {
  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      <div className="w-full md:w-2/3">
        <CanadaRealEstateMap />
      </div>
      <div className="w-full md:w-1/3">
        <MenuTabs />
      </div>
    </div>
  );
}
