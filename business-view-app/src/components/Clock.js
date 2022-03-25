
import React, {useState, useEffect} from 'react';


const Clock = () => {
	const [dateState, setDateState] = useState(new Date());

    useEffect(() => {setInterval(() => setDateState(new Date()), 30000)}, []);
	
	return (
		<div className = 'imagePos'>
			<img src='calender.png' width={30} height={30} alt='Calender' />
            {' '}
                {dateState.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}

            <img src='clock.png' width={30} height={30}  alt='Large Pizza' />
            {dateState.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })}
		</div>
		
	)
}
 

export default Clock