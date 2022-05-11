import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function WelcomeTynography(props) {
    return (
        <div>
            <Typography component='div'>
                <Box sx={{ 
                    textAlign: 'left', 
                    m: 2 ,
                    fontWeight: '500',
                    fontSize: 'h6.fontSize',                    
                    }}
                  > Hello Mark ! </Box>                
            </Typography>
            </div>
             // </div>/<Typography component='div'>
               // <Box sx={{ 
                //    textAlign: 'left', 
                //    m: 2 ,
                //    fontWeight: '500',
               //     fontSize: 'h6.fontSize',                    
              //      }}
              //</Typography>    > We have 10 new error log events today. </Box>                
            //</Typography>
            
      
    );
}

export default WelcomeTynography;