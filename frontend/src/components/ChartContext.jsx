import React from 'react';
import Chart from './Chart';
import Chart2 from './Chart2';
import { CircularProgress } from '@mui/material';
import useSWR from 'swr';

function ChartContext({ id, type, after, w, h }) {

    let url;
    
    if (after != undefined)
        url = `http://localhost:10000/api/records?id=${id}&type=${type}&after=${after}`
    else
        url = `http://localhost:10000/api/records?id=${id}&type=${type}`

    const { data, error, isLoading } = useSWR(url, (uri) => fetch(uri)
        .then(res => res.json()));

    if (isLoading)
        return <CircularProgress />;

    if (error)
    {
        console.log(error)
        return <div>Error!</div>
    }

    console.log(data);

    return (
        <Chart2
            w={w}
            h={h}
            yTitle={type.charAt(0).toUpperCase() + type.slice(1)}
            times={data.map((e) => {
                return Date.parse(e.time);
            })}
            values={data.map((e) => {
                switch (type)
                {
                    case "humidity":
                        return e.humidity;
                    case "temperature":
                        return e.temperature;
                    case "pressure":
                        return e.pressure;
                    case "benzene":
                        return e.benzene;
                    case "alcohol":
                        return e.alcohol;
                    case "smoke":
                        return e.smoke;
                    case "altitude":
                        return e.altitude;
                    case "ppm":
                        return e.ppm;
                }
            })}
        />
    )
}

export default ChartContext