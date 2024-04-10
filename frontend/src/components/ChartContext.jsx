import React from 'react';
import Chart from './Chart';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

function ChartContext({ sensorId, type }) {

    const { data, isLoading, error } = useQuery({
        queryFn: () => {
            fetch(`http:localhost:10000/api/records?id=${sensorId}&type=humidity`).then((res) => { res.json(); console.log(res)});
        },
        queryKey: ['records'],
    });

    if (isLoading)
        return <CircularProgress />;

    if (error)
    {
        console.log(error)
        return <div>Error!</div>
    }

    console.log(JSON.parse(data))

    return (
        <Chart
            times={data.map((e) => {
                return e.time;
            })}
            values={data.map((e) => {
                switch (type)
                {
                    case "humidity":
                        return e.humidity;
                }
            })}
        />
    )
}

export default ChartContext