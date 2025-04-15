import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
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