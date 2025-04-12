import { Card, CardContent } from "../ui/card";


export function MapViewComponent() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="bg-gray-200 h-96 rounded flex items-center justify-center text-gray-500">
                    🗺️ Map Placeholder (Pins by Score)
                </div>
            </CardContent>
        </Card>
    )
}