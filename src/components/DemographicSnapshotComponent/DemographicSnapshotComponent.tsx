import { Card, CardContent } from "../ui/card";
import { InfoRow } from "./InfoRow";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WavesIcon from "@mui/icons-material/Waves";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import TranslateIcon from "@mui/icons-material/Translate";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SearchIcon from "@mui/icons-material/Search";

export function DemographicSnapshotComponent() {
  return (
    <Card>
      <CardContent className="p-4 grid grid-cols-2 gap-4 text-sm">
        <InfoRow
          icon={<PeopleIcon fontSize="small" />}
          label="Population"
          value="105,431"
        />
        <InfoRow
          icon={<MonetizationOnIcon fontSize="small" />}
          label="Household Income"
          value="$108,834"
        />
        <InfoRow
          icon={<CalendarTodayIcon fontSize="small" />}
          label="Median Age"
          value="33.6"
        />
        <InfoRow
          icon={<WavesIcon fontSize="small" />}
          label="Saturation"
          value="1,550"
        />
        <InfoRow
          icon={<LocalHospitalIcon fontSize="small" />}
          label="Practices Nearby"
          value="68"
        />
        <InfoRow
          icon={<WorkIcon fontSize="small" />}
          label="Employees"
          value="118,479"
        />
        <InfoRow
          icon={<HomeIcon fontSize="small" />}
          label="Home Ownership"
          value="36.4%"
        />
        <InfoRow
          icon={<TranslateIcon fontSize="small" />}
          label="Speaks English"
          value="72.1%"
        />
        <InfoRow
          icon={<TrendingUpIcon fontSize="small" />}
          label="Observed Growth"
          value="+2.8%"
        />
        <InfoRow
          icon={<GroupIcon fontSize="small" />}
          label="Avg. Household Size"
          value="1.83"
        />
        <InfoRow
          icon={<AttachMoneyIcon fontSize="small" />}
          label="Fee Index"
          value="$$$$"
        />
        <InfoRow
          icon={<SearchIcon fontSize="small" />}
          label="Search Index"
          value="●○○○○"
        />
      </CardContent>
    </Card>
  );
}
