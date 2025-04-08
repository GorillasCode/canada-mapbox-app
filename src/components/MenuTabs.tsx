import { useState } from "react";
import CanadaStats from "./CanadaStats";
import { ChartCard } from "./ChartCard";

const Tabs = ["National", "State", "County", "Area", "Address", "Charts"];

const MenuWithTabs = () => {
  const [activeTab, setActiveTab] = useState("National");

  const renderContent = () => {
    switch (activeTab) {
      case "National":
        return <CanadaStats />;
      case "Charts":
        return <ChartCard selectedCity="Canadá" />;
      case "State":
      case "County":
      case "Area":
      case "Address":
        return <div>''</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow w-full h-full">
      <div className="flex gap-6 border-b pb-4 mb-4">
        {Tabs.map(tab => (
          <button
            key={tab}
            className={`pb-1 font-medium ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-[200px]">{renderContent()}</div>
    </div>
  );
};

export default MenuWithTabs;
