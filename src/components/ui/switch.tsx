import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const PinkSwitch = styled(Switch)(({ theme }) => ({

  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red[300],
    '&:hover': {
      backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
      color: red[600],
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red[400],
  },
}));

interface CustomPinkSwitchProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;  
    label: string;
}

export default function CustomPinkSwitch({ handleChange, label }: CustomPinkSwitchProps) {
  return (
    <FormGroup>
        <FormControlLabel 
            control={<PinkSwitch onChange={handleChange} />} 
            label={label || 'Label'} 
            />
    </FormGroup>
  );
}