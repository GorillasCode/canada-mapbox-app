import { Card, CardContent } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


export function SearchAreaComponent() {
    return (
        <Card>
            <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <Input placeholder="Enter Address or Location" />
                <div className="flex items-center gap-2">
                <label className="text-sm">Radius (miles)</label>
                <Input type="number" defaultValue={2} className="w-20" />
                </div>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ON">Ontario</SelectItem>
                        <SelectItem value="QC">Quebec</SelectItem>
                        <SelectItem value="BC">British Columbia</SelectItem>
                        <SelectItem value="AB">Alberta</SelectItem>
                        {/* Add other provinces */}
                    </SelectContent>
                </Select>
                <Button className="w-full">Search Area</Button>
            </div>
            </CardContent>
        </Card>
    )
}