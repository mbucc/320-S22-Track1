import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

/**
 * @author hiimlo
 * Multiselect dropdown for business process, can be used else where wherever needed
 * allows for multiselection of business domains for additional filtering on the table
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


export default function MultipleSelectDropdown({options, selectedOptions, handleChange}) {
    const isError = () => {
      return selectedOptions.size < 1;
  }

    return (
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Business Domain</InputLabel>
              <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedOptions}
              onChange={handleChange}
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
          </FormControl>
          <FormHelperText 
                  sx={{marginRight: 0, marginLeft: 0, marginTop: 0}}
                  className='multidropdown-errmess'
              >
                  {isError() ? "Choose at least one" : " "}
          </FormHelperText>
        </div>
    );
}

