import { canadaData } from "../data/mockData";
import PeopleIcon from "@mui/icons-material/People";

export default function CanadaStats() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-center text-lg font-bold text-blue-800 mb-4">
        CANADA
      </h2>

      <div className="grid grid-cols-2 gap-y-6 text-sm text-gray-700">
        {canadaData.map(({ label, value, icon: Icon }, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 text-sm text-gray-700"
          >
            <div className="flex items-center gap-2 text-blue-600">
              <Icon className="text-base" />
              <span className="font-medium">{label}</span>
            </div>
            <span className="ml-6 font-semibold text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
