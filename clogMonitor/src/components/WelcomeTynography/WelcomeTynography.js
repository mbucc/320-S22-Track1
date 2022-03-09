import React from 'react';
import Typography from '@mui/material/Typography';

function WelcomeTynography(props) {
    return (
        <div>
            <Typography variant="h6">
                Hello Mark!
            </Typography>
            <Typography variant="h6">
                We have 10 new error log events today.
            </Typography>
        </div>
    );
}

export default WelcomeTynography;