import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import React from "react";
import { getTableData } from "../fakeDatabase";
import CheckboxGroup from "./CheckboxGroup";
import Dropdown from "./Dropdown";

const getCurrentDateTimeString = () => {
  let now = new Date();
  let offset = now.getTimezoneOffset() * 60000;
  let adjustedDate = new Date(now.getTime() - offset);
  let formattedDate = adjustedDate.toISOString().substring(0, 19);
  return formattedDate;
};

const LogEventsFilters = ({ tableDataSetter }) => {
  // Component States
  // Checkbox group states
  const allPriorities = ["High", "Medium", "Low"];
  const prioritiesMapping = ["70", "50", "10"];
  const [selectedPriorities, setSelectedPriorities] = React.useState(
    new Set(allPriorities)
  );
  const allSeverities = ["Errors", "Warnings", "Info", "Success"];
  const [selectedSeverities, setSelectedSeverities] = React.useState(
    new Set(allSeverities)
  );
  const allCategories = ["Status", "Start", "Stop", "Security", "Heartbeat"];
  const [selectedCategories, setSelectedCategories] = React.useState(
    new Set(allCategories)
  );
  // Dropdown states
  const dummyDomainOptions = ["Domain 1", "Domain 2", "Domain 3"];
  const [EAIDomain, setEAIDomain] = React.useState("All");
  const [businessDomain, setBusinessDomain] = React.useState("All");
  const [businessSubDomain, setBusinessSubDomain] = React.useState("All");
  const dummyApplicationOptions = [
    "Application 1",
    "Application 2",
    "Application 3",
  ];
  const [application, setApplication] = React.useState("All");
  const dummyProcessOptions = ["Process/Service 1", "Process/Service 2"];
  const [process_service, setProcess_service] = React.useState("All");

  const [startTime, setStartTime] = React.useState(getCurrentDateTimeString());
  const [endTime, setEndTime] = React.useState(getCurrentDateTimeString());

  // Handlers
  const handleApplyFilters = (e) => {
    e.preventDefault();
    console.log("Apply filters was pressed");
    // parse the filters
    const filters = {
      PRIORITY: new Set(
        [...selectedPriorities].map(
          (p) => prioritiesMapping[allPriorities.indexOf(p)]
        )
      ),
    };

    // Request table data according to filters (This is where we would do a axios POST)
    const resultData = getTableData(filters);
    // We may need to do some conversion afterwards
    // Set the changes
    tableDataSetter(resultData);
  };

  // Checkbox group selection handlers
  const getCheckboxHandler = (selections, setter) => {
    return (event) => {
      let newSelections = new Set([...selections]);
      if (event.target.checked) {
        newSelections.add(event.target.name);
      } else {
        newSelections.delete(event.target.name);
      }
      setter(newSelections);
    }
  }

  // Dropdown selection handlers
  const getDropdownHandler = (setter) => {
    return (event) => setter(event.target.value);
  }

  // Full form error checking
  const hasError = () => {
    if (selectedCategories.size < 1) {
      return true;
    }
    if (selectedPriorities.size < 1) {
      return true;
    }
    if (selectedSeverities.size < 1) {
      return true;
    }
    // will need to add error checking for datetime
    return false;
  }

  return (
    <div>
      <form className="log-events-filters" onSubmit={handleApplyFilters}>
        <CheckboxGroup
          label={"Priorities"}
          options={allPriorities}
          selectedOptions={selectedPriorities}
          handleSelection={getCheckboxHandler(selectedPriorities, setSelectedPriorities)}
        ></CheckboxGroup>
        <CheckboxGroup
          label={"Severities"}
          options={allSeverities}
          selectedOptions={selectedSeverities}
          handleSelection={getCheckboxHandler(selectedSeverities, setSelectedSeverities)}
        ></CheckboxGroup>
        <CheckboxGroup
          label={"Categories"}
          options={allCategories}
          selectedOptions={selectedCategories}
          handleSelection={getCheckboxHandler(selectedCategories, setSelectedCategories)}
        ></CheckboxGroup>

        <div className="dropdown-group">
          <Dropdown
            label={"EAI Domain"}
            value={EAIDomain}
            handleSelection={getDropdownHandler(setEAIDomain)}
            options={dummyDomainOptions}
          ></Dropdown>

          <Dropdown
            label={"Business Domain"}
            value={businessDomain}
            handleSelection={getDropdownHandler(setBusinessDomain)}
            options={dummyDomainOptions}
          ></Dropdown>

          <Dropdown
            label={"Business SubDomain"}
            value={businessSubDomain}
            handleSelection={getDropdownHandler(setBusinessSubDomain)}
            options={dummyDomainOptions}
          ></Dropdown>

          <Dropdown
            label={"Application"}
            value={application}
            handleSelection={getDropdownHandler(setApplication)}
            options={dummyApplicationOptions}
          ></Dropdown>
          <Dropdown
            label={"Process/Service"}
            value={process_service}
            handleSelection={getDropdownHandler(setProcess_service)}
            options={dummyProcessOptions}
          ></Dropdown>
        </div>

        <FormControl margin="normal">
          <Stack spacing={2}>
            <FormControl>
              <InputLabel htmlFor="starttime" shrink>
                Start Time
              </InputLabel>
              <OutlinedInput
                defaultValue={getCurrentDateTimeString()}
                // value={startTime}
                label="Start Time"
                type="datetime-local"
                id="starttime"
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="endtime">End Time</InputLabel>
              <OutlinedInput
                defaultValue={getCurrentDateTimeString()}
                label="End Time"
                type="datetime-local"
                id="endtime"
              />
            </FormControl>
          </Stack>
        </FormControl>

        <FormControl>
          <Button disabled={hasError()} variant="contained" type="submit">
            Apply
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default LogEventsFilters;
