import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';

const CheckboxGroup = ({label, options, selectedOptions, handleSelection}) => {
    const isError = () => {
        return selectedOptions.size < 1;
    }
    return (
        <FormControl error={isError()} style={{minWidth: "115px"}}>
            <FormLabel>{label}</FormLabel>
            <FormGroup>
                {options.map(option => 
                    <FormControlLabel
                        key={option}
                        name={option}
                        checked={selectedOptions.has(option)}
                        control={<Checkbox size="small" onChange={handleSelection}/>}
                        label={option}
                    />
                )}
            </FormGroup>
            <FormHelperText sx={{marginRight: 0, marginLeft: 0}}>{isError() ? "Choose at least one" : " "}</FormHelperText>
        </FormControl>
    );
}

export default CheckboxGroup;

