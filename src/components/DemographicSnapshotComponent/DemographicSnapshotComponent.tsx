import { Card, CardContent } from "../ui/card";
import { useMapbox } from "../../contexts/mapboxContext";


export function DemographicSnapshotComponent() {
  const { demographicData } = useMapbox();

  return (
    <Card>
      <CardContent className="p-4 grid grid-cols-2 gap-4 text-sm">
        <div><strong>Population:</strong> {demographicData.population.toLocaleString()}</div>
        <div><strong>Household Income:</strong> ${demographicData.income.toLocaleString()}</div>
        <div><strong>Median Age:</strong> {demographicData.medianAge}</div>
        <div><strong>Saturation:</strong> {demographicData.saturation}</div>
        <div><strong>Practices Nearby:</strong> {demographicData.practicesNearby}</div>
        <div><strong>Employees:</strong> {demographicData.employees.toLocaleString()}</div>
        <div><strong>Home Ownership:</strong> {demographicData.homeOwnership}%</div>
        <div><strong>Speaks English:</strong> {demographicData.englishSpeaking}%</div>
        <div><strong>Observed Growth:</strong> {demographicData.growth}%</div>
        <div><strong>Avg. Household Size:</strong> {demographicData.avgHouseholdSize}</div>
        <div><strong>Fee Index:</strong> {demographicData.feeIndex}</div>
        <div><strong>Search Index:</strong> {demographicData.searchIndex}</div>
      </CardContent>
    </Card>
  );
}