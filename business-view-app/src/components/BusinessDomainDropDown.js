import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [EAI_Domain, setEAIDomain] = React.useState('');

  const handleChange = (event) => {
    setEAIDomain(event.target.value);
  };


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, width: 250 }}
    >
        <InputLabel id="EAI_Domain_label">EAI Domain</InputLabel>
        <Select
          labelId="EAI_Domain_label"
          id="simple-select"
          value={EAI_Domain}
          label="EAI Domain"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value={10}>EAI Domain 1</MenuItem>
          <MenuItem value={20}>EAI Domain 2</MenuItem>
          <MenuItem value={30}>EAI Domain 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

