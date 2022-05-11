import React from 'react'
import { Button } from "@mui/material";

/**
 * A wrapper for a MaterialUI Button 
 * 
 * @author Isaac Gebrewolde
 * 
 * @param {Object} props
 * @param {string} props.label - A label for the button
 * @param {Object} props.logEvent - Log Event object containing all of the Log Details
 * 
 * @returns {React.ElementType}
 */

export const LogDetailsButton = (props) => {
    // onClick event handler for log details button
    const saveLogDetails = (logEvent) => {
        localStorage.setItem(`LogDetails-${logEvent.globalInstanceId}`, JSON.stringify(logEvent));
    }
    console.log(props.logEvent);
    return (
    <Button onClick={() => saveLogDetails(props.logEvent)} {...props}>{props.label}</Button>
  )
}
