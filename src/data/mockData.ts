import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import TranslateIcon from "@mui/icons-material/Translate";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SearchIcon from "@mui/icons-material/Search";

export const mockData: {
  nome: string;
  preco_medio: number;
  coords: [number, number];
}[] = [
  { nome: "Toronto", preco_medio: 850000, coords: [-79.3832, 43.6532] },
  { nome: "Vancouver", preco_medio: 950000, coords: [-123.1207, 49.2827] },
  { nome: "Montreal", preco_medio: 600000, coords: [-73.5673, 45.5017] }
];

export const historicoPrecos = [
  { mes: "Jan", preco: 780000 },
  { mes: "Feb", preco: 800000 },
  { mes: "Mar", preco: 820000 },
  { mes: "Apr", preco: 850000 }
];

export const canadaData = [
  { label: "Population", value: "36,328,475", icon: PeopleIcon },
  { label: "Household Income", value: "CAD$ 70,336", icon: AttachMoneyIcon },
  { label: "Practices", value: "9,574", icon: LocalHospitalIcon },
  { label: "Saturation", value: "—", icon: BlurOnIcon },
  { label: "Employees", value: "20,994,500", icon: WorkIcon },
  { label: "Median Age", value: "41.2", icon: CalendarTodayIcon },
  { label: "Observed Growth", value: "5.2%", icon: TrendingUpIcon },
  { label: "Home Ownership", value: "69%", icon: HomeIcon },
  { label: "Avg Household Size", value: "2.9", icon: GroupIcon },
  { label: "Speaks English/French", value: "76.8%", icon: TranslateIcon },
  { label: "Fee Index", value: "💲💲💲⚪⚪", icon: MonetizationOnIcon },
  { label: "Search Index", value: "🔍🔍🔍⚪⚪", icon: SearchIcon }
];
