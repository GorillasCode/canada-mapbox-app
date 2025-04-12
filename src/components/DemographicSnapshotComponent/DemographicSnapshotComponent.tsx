import { Card, CardContent } from "../ui/card";


export function DemographicSnapshotComponent() {
    return (
        <Card>
          <CardContent className="p-4 grid grid-cols-2 gap-4 text-sm">
            <div><strong>Population:</strong> 105,431</div>
            <div><strong>Household Income:</strong> $108,834</div>
            <div><strong>Median Age:</strong> 33.6</div>
            <div><strong>Saturation:</strong> 1,550</div>
            <div><strong>Practices Nearby:</strong> 68</div>
            <div><strong>Employees:</strong> 118,479</div>
            <div><strong>Home Ownership:</strong> 36.4%</div>
            <div><strong>Speaks English:</strong> 72.1%</div>
            <div><strong>Observed Growth:</strong> +2.8%</div>
            <div><strong>Avg. Household Size:</strong> 1.83</div>
            <div><strong>Fee Index:</strong> $$$$</div>
            <div><strong>Search Index:</strong> ●○○○○</div>
          </CardContent>
        </Card>
    )
}

