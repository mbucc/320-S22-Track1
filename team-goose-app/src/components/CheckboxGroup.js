import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';

const CheckboxGroup = ({label, options, selectedOptions, handleSelection}) => {

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <FormGroup>
                {options.map(option => 
                    <FormControlLabel
                        key={option}
                        name={option}
                        checked={selectedOptions.has(option)}
                        control={<Checkbox onChange={handleSelection}/>}
                        label={option}
                    />
                )}
            </FormGroup>
        </FormControl>
    );
}

export default CheckboxGroup;

