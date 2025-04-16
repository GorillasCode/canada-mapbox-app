import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent
} from "@mui/material";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: Option[];
}

export function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${label}-label`}
        value={value}
        label={label}
        onChange={onChange}
        autoWidth
        style={{width: "20vw"}}
        className="bg-gray-100 text-black"
      >
        {options.map(option => (
          <MenuItem 
            style={{width: "20vw"}} 
            key={option.value} 
            value={option.value}
            >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
