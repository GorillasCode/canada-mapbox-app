import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { historicoPrecos } from "../data/mockData";

export const ChartCard = ({ selectedCity }: { selectedCity: string }) => (
  <div className="w-full p-4 bg-white shadow-xl">
    <h2 className="text-xl font-bold mb-4">
      Histórico de Preços - {selectedCity}
    </h2>
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
      <div className="mt-2">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={historicoPrecos}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="preco"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
