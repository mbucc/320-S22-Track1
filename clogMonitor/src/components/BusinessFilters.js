import React from "react";
import {Button, FormControl} from "@mui/material";
import CustomDateTimePicker from "../components/CustomDateTimePicker"
import { Grid, TextField, Stack } from '@mui/material';
import Dropdown from "./Dropdown";
import BusinessTree from '../components/BusinessTree';
import RefreshButton from '../components/RefreshButton';


/**
 * Note: for this to work the way we want it to, we use a  "form"
 * Components that should be put here (as of 3/31 understanding):
 *   Start/End time
 *   EAI domain drop down
 *   Publishing domain drop down
 *   tree view
 *   Apply button
 * 
 * --> Refresh button does not need to be here since it simply updates the times
 * Essentially how this will be built is within some sort of Form tag (<FormControl />)
 * these components should be added
 * All components listed are "inputs", as well as apply button (exception: this "submits" the form)
 * Handlers for each component needs to exist so we can keep track of what has been selected. 
 * Keeping track is important so that when we apply(submit form), filters are known
 * 
 * https://www.pluralsight.com/guides/form-submission-in-reactjs <-- resource to understand
 * 
 * - @hiimlo note
 * 
 * 
 * 
 * @returns {React.ElementType}
 */

const BusinessFilters = () => {

    const EAI_DOMAIN_ID = "EAI_DOMAIN_ID"
    const BUSINESS_DOMAIN_ID = "BUSINESS_DOMAIN_ID"

    // Dropdown states
    const EAIDomains = ["EAI_DOMAIN_1", "EAI_DOMAIN_2"];
    const [EAIDomain, setEAIDomain] = React.useState("All");
    const businessDomains = ["OPER", "CRM", "ACCOUNT"];
    const [businessDomain, setBusinessDomain] = React.useState("All");

    const getDropdownHandler = (setter) => {
        return (event) => setter(event.target.value);
    }
    const makeDropdownProps = (label, id, options, value, setter) => {
        return {
            label: label,
            id: id,
            options: options,
            value: value,
            handler: getDropdownHandler(setter),
        }
    }
    const dropdownProps = [
        makeDropdownProps("EAI Domain", EAI_DOMAIN_ID, EAIDomains, EAIDomain, setEAIDomain),
        makeDropdownProps("Business Domain", BUSINESS_DOMAIN_ID, businessDomains, businessDomain, setBusinessDomain)
    ]
    return (
        <div>
            <form className="business-filters">
                <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
                    <Grid item lg={2} xl={1.25}>
                        <h1>Business Processes</h1>
                    </Grid>
                    <Grid item lg={2.75} xl={2}>
                        <CustomDateTimePicker />
                    </Grid>
                    <Grid item lg={2.75} xl={2}>
                        {
                            dropdownProps.map(dprops => {
                                return (
                                    <Dropdown
                                    key={dprops.label}
                                    label={dprops.label}
                                    id={dprops.id}
                                    options={dprops.options}
                                    value={dprops.value}
                                    handleSelection={dprops.handler}
                                    />
                            );
                        })
                    }
                    </Grid>
                    <Grid item lg={1} xl={1.5}>
                    </Grid>
                    <Grid item lg={9} xl={6.75}>
                        <BusinessTree />
                    </Grid>
                    <Grid item lg={8} xl={8} />
                    <Grid item lg={1} xl={4}>
                        <FormControl>
                            <Button sx={{marginTop: "16px"}} variant="contained" type="submit">
                                Apply
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
export default BusinessFilters;