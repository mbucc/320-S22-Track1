import * as React from 'react';
import { Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';

/**
 * @author hiimlo
 * Multiselect dropdown for business process, can be used else where wherever needed
 * allows for multiselection of business domains for additional filtering on the table
 * 
 * @param {Array<string>} options - list of all options for the dropdown
 * @param {Array<string>} selectedOptions - list of selected options from the possible set
 * @param {(event: Event) => any} handleSelection - handler for multiselect dropdown
 *
 * @returns {React.ElementType}
 */


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};


export default function MultipleSelectDropdown({options, selectedOptions, handleSelection}) {

  const isError = () => {
    return selectedOptions.size < 1;
  }

    return (
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="business-multiple-checkbox-label">Business Domain</InputLabel>
              <Select
              labelId="business-multiple-checkbox-label"
              id="business-multiple-checkbox"
              multiple
              value={selectedOptions}
              onChange={handleSelection}
              input={<OutlinedInput label="Business Domain" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              >
                  <MenuItem key={"All"} value={"All"}>
                    <Checkbox 
                    checked={selectedOptions.length === options.length} 
                    indeterminate={selectedOptions.size !== options.length && selectedOptions.size > 0}
                    />
                    <ListItemText primary={"All"} />
                  </MenuItem>
                  {options.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      <Checkbox checked={selectedOptions.indexOf(opt) > -1} />
                      <ListItemText primary={opt} />
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>
                {isError() ? "Choose at least one" : " "}
              </FormHelperText>
          </FormControl>
        </div>
    );
}

