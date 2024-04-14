import { LineChart } from '@mui/x-charts'
import React from 'react';

function Chart({ times, values })
{
    return (
        <LineChart
            xAxis={[ { data: [...times] } ]}
            series = {[ { data: [...values] } ]}
            width={500}
            height={300}
        />
    )
}

export default Chart