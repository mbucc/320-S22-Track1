import React from 'react'
import './featuredInfo.css'
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export default function FeaturedInfo(){

    return(
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle"> Today's Info <InfoIcon className = 'titleIcon'/>
                </span>
                <div className='featuredContainer'>
                    <span className = "todaysnumber">10</span> 
                    <span className = 'compareYesterday'> -2 <ArrowDownwardIcon  className='featuredIcon'/> 
                    </span>
                </div>
                <span className='featuredSub'>Compared to Yesterday </span>
            </div>


            <div className="featuredItem">
                <span className="featuredTitle"> Today's Warning <WarningIcon className = 'titleIcon warning'/>
                </span>
                <div className='featuredContainer'>
                    <span className = "todaysnumber">12</span>
                    <span className = 'compareYesterday'> +2 <ArrowUpwardIcon  className='featuredIcon negative'/> 
                    </span>
                </div>
                <span className='featuredSub'>Compared to Yesterday </span>
            </div>


            <div className="featuredItem">
                <span className="featuredTitle"> Today's Error <ErrorIcon className = 'titleIcon error'/>
                </span>
                <div className='featuredContainer'>
                    <span className = "todaysnumber">13</span>
                    <span className = 'compareYesterday'> +3 <ArrowUpwardIcon className='featuredIcon negative'/>
                    </span> 
                </div>
                <span className='featuredSub'>Compared to Yesterday </span>
            </div>
        </div>

    
    )
}