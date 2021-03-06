import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material';

/**
 * A group of checkboxes for selecting any or all of some options
 * 
 * @author Kevin Lin
 * @author Ameya Jain
 * 
 * @param {Object} props
 * @param {string} props.label - A label for the group
 * @param {Set<string>} props.selectedOptions - The set of currently selected options
 * @param {Array<string>} props.options - A list of possible option values (in the order of appearance)
 * @param {(event: Event) => any} props.handleSelection - Handler for when an option is selected
 * @param {string} props.direction - Direction of checkboxes ('row' or 'column'). Direction is column by default
 * 
 * @returns {React.ElementType}
 */
const CheckboxGroup = ({label, options, selectedOptions, handleSelection, direction}) => {
    // The group has an error if there are no selected options
    const isError = () => {
        return selectedOptions.size < 1;
    }

    return (
        <FormControl className={`checkbox-group ${label}`} error={isError()} style={{minWidth: "115px"}}>
            <FormLabel className='checkbox-label'>{label}</FormLabel>
            <FormGroup row={direction === 'row' ? true : false}>
                <FormControlLabel 
                    label = 'All'
                    name='All'
                    control={
                        <Checkbox
                            size='small'
                            checked={selectedOptions.size === options.length}
                            indeterminate={selectedOptions.size !== options.length && selectedOptions.size > 0}
                            onChange={handleSelection}
                        />
                    }
                />
                {options.map(option => 
                    <FormControlLabel
                        className='checkbox'
                        key={option}
                        name={option}
                        checked={selectedOptions.has(option)}
                        control={<Checkbox size="small" onChange={handleSelection}/>}
                        label={option}
                    />
                )}
            </FormGroup>
            <FormHelperText 
                sx={{marginRight: 0, marginLeft: 0, marginTop: 0}}
                className='checkbox-errmess'
            >
                {isError() ? "Choose at least one" : " "}
            </FormHelperText>
        </FormControl>
    );
}

export default CheckboxGroup;

