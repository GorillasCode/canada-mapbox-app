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
import { useMapbox } from "../../contexts/mapboxContext";

export function DemographicSnapshotComponent() {
  const { demographicData } = useMapbox();

  return (
    <Card>
      <CardContent className="p-4 grid grid-cols-2 gap-4 text-sm">
        <InfoRow
          icon={<PeopleIcon fontSize="small" />}
          label="Population"
          value={demographicData.population.toLocaleString()}
        />
        <InfoRow
          icon={<MonetizationOnIcon fontSize="small" />}
          label="Household Income"
          value={demographicData.income.toLocaleString()}
        />
        <InfoRow
          icon={<CalendarTodayIcon fontSize="small" />}
          label="Median Age"
          value={demographicData.medianAge.toLocaleString()}
        />
        <InfoRow
          icon={<WavesIcon fontSize="small" />}
          label="Saturation"
          value={demographicData.saturation.toLocaleString()}
        />
        <InfoRow
          icon={<LocalHospitalIcon fontSize="small" />}
          label="Practices Nearby"
          value={demographicData.practicesNearby.toLocaleString()}
        />
        <InfoRow
          icon={<WorkIcon fontSize="small" />}
          label="Employees"
          value={demographicData.employees.toLocaleString()}
        />
        <InfoRow
          icon={<HomeIcon fontSize="small" />}
          label="Home Ownership"
          value={demographicData.homeOwnership.toLocaleString() + "%"}
        />
        <InfoRow
          icon={<TranslateIcon fontSize="small" />}
          label="Speaks English"
          value={demographicData.englishSpeaking + "%"}
        />
        <InfoRow
          icon={<TrendingUpIcon fontSize="small" />}
          label="Observed Growth"
          value={demographicData.growth + "%"}
        />
        <InfoRow
          icon={<GroupIcon fontSize="small" />}
          label="Avg. Household Size"
          value={demographicData.avgHouseholdSize.toLocaleString()}
        />
        <InfoRow
          icon={<AttachMoneyIcon fontSize="small" />}
          label="Fee Index"
          value={demographicData.feeIndex}
        />
        <InfoRow
          icon={<SearchIcon fontSize="small" />}
          label="Search Index"
          value={demographicData.searchIndex}
        />
      </CardContent>
    </Card>
  );
}
