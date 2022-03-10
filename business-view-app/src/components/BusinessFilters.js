import React from "react";
import CheckboxSeverities from "./CheckboxSeverities";

//TODO:  UPDATE AS MORE FILTERS ARE MADE
//STILL LEFT: dropdowns, tree, dates

const BusinessFilters = () => {

    const sevList = ["Errors", "Warnings", "Success", "Info"];
    const [severities, setSeverities] = React.useState(new Set(sevList));

    const checkedHandler = (selections, set) => {
        return (event) => {
            let toSet = new Set([...selections]);
            if (event.target.checked) {
                toSet.add(event.target.name);
            }
            else {
                toSet.delete(event.target.name);
            }
            set(toSet);
        }

    }

    return (
        <div>
            <form className="business-filters">
                <CheckboxSeverities 
                  selected={severities}
                  handleSelected={checkedHandler(severities, setSeverities)}
                />
            </form>
        </div>
    );
}
export default BusinessFilters;