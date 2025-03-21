import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Location() {
    
        const [age, setAge] = React.useState('');
      
        const handleChange = (event) => {
          setAge(event.target.value);
        };
    return (
        <FormControl required sx={{ m: 1, minWidth: 280 }}>
        <InputLabel id="demo-simple-select-required-label">Type of vehicle</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={age}
          label="Age *"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Gasoline Car</MenuItem>
          <MenuItem value={20}>Diesel Car</MenuItem>
          <MenuItem value={30}>Electric Vehicle</MenuItem>
          <MenuItem value={30}>Hybrid Car</MenuItem>
          <MenuItem value={30}>Natural Gas Vehicle</MenuItem>
          <MenuItem value={30}>Bus</MenuItem>
          <MenuItem value={30}>Truck</MenuItem>
          <MenuItem value={30}>Motorcylce</MenuItem>
          <MenuItem value={30}>Air Travel</MenuItem>
          <MenuItem value={30}>Electric Train</MenuItem>
          <MenuItem value={30}>Diesel Train</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    )
}

export default Location