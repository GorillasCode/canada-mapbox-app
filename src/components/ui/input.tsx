import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export function SearchInput({
  type = "text",
  value,
  onChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label="Search Address or Location"
      variant="outlined"
      fullWidth
      size="small"
      placeholder="Ex: Toronto, ON"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        )
      }}
    />
  );
}
