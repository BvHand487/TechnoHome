import React from 'react';
import Overview from './Overview';

function OverviewList() {
  
    // overview from cache ??? current sensor values.
  
    return (
        <div className="overview-list">
            {data.map(s => {

                return (
                    <Overview key={s.id} id={s.id} />
                );
            })}
        </div>
    );
}

export default OverviewList;