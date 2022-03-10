import React from 'react';
import BusinessFilters from './BusinessFilters';

//will need to check if this is correct once able to see updates in local host

const BusinessView = () => {
    return (
        <div className='business-container'>
            <BusinessFilters></BusinessFilters>
        </div>
    );
}

export default BusinessView;