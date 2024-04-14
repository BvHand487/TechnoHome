import { CircularProgress } from '@mui/material';
import React from 'react';
import useSWR from 'swr';
import Sensor from './Sensor';

function SensorList()
{
    const { data, error, isLoading } = useSWR(`http://localhost:10000/api/sensors`, (uri) => fetch(uri)
        .then(res => res.json()));

    if (isLoading)
        return <CircularProgress />;

    if (error)
    {
        console.log(error)
        return <div>Error!</div>
    }

    return (
        <div>
            {data.map(s => {
                
                let status = 'faulty';

                if (s.enabled && s.functioning)
                    status = 'active';

                else if (!s.enabled && s.functioning)
                    status = 'paused';

                else if (!s.functioning)
                    status = 'faulty';


                return (
                    <Sensor key={s.sensorId} id={s.sensorId} name={s.name} status={status} />
                );
            })}
        </div>
    )
}

export default SensorList