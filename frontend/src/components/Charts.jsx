import React, { useEffect } from 'react'
import ChartContext from './ChartContext';
import './sensors/sensors.css';
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';


function Charts({ id, type }) {
    const { data, error, isLoading } = useSWR(`http://localhost:10000/api/sensors/${id}/latest`, (uri) => fetch(uri)
        .then(res => res.json()));

    if (type == 'More') {
        return (
            <>
                <div className="chart h-[35vh] !w-[30vw]">
                    <ChartContext id={id} type={'smoke'} h={window.innerHeight * 3.5 / 10 - 2} w={window.innerWidth * 3 / 10 - 3} />
                </div>
                <div className="chart h-[35vh] !w-[30vw]">
                    <ChartContext id={id} type={'alcohol'} h={window.innerHeight * 3.5 / 10 - 2} w={window.innerWidth * 3 / 10 - 3} />
                </div>
                <div className="chart h-[35vh] !w-[30vw]">
                    <ChartContext id={id} type={'benzene'} h={window.innerHeight * 3.5 / 10 - 2} w={window.innerWidth * 3 / 10 - 3} />
                </div>
                <div className="chart h-[35vh] !w-[30vw]">
                    <ChartContext id={id} type={'altitude'} h={window.innerHeight * 3.5 / 10 - 2} w={window.innerWidth * 3 / 10 - 3} />
                </div>
            </>
        );
    }

    else if (type == 'Overview') {
        if (isLoading)
            return <CircularProgress />;

        if (error) {
            console.log(error)
            return <div>Error!</div>
        }

        console.log(data);

        return (
            <>
                <div className='text-5xl'>Latest Data</div>
                <div className='text-2xl'>{new Date(data.time).toLocaleString()}</div>
                <div className='divider'></div>
                <ul>
                    <li className='overview-item'>Temperature: <strong className='overview-item-value'>{data.temperature} ℃</strong> </li>
                    <li className='overview-item'>Air Quality: <strong className='overview-item-value'>{data.ppm} ppm</strong> </li>
                    <li className='overview-item'>Humidity: <strong className='overview-item-value'>{data.humidity} Rh%</strong> </li>
                    <li className='overview-item'>Pressure: <strong className='overview-item-value'>{data.pressure} hPa</strong> </li>
                    <li className='overview-item'>Altitude: <strong className='overview-item-value'>{data.altitude} m</strong> </li>
                    <li className='overview-item'>Smoke Concentration: <strong className='overview-item-value'>{data.smoke} ppm</strong> </li>
                    <li className='overview-item'>Alcohol Concentration: <strong className='overview-item-value'>{data.alcohol} ppm</strong> </li>
                    <li className='overview-item'>Benzene Concentration: <strong className='overview-item-value'>{data.benzene} ppm</strong> </li>
                </ul>
            </>
        )
    }

    else {
        return (
            <div className="chart">
                <ChartContext id={id} type={type} h={window.innerHeight * 31 / 40 - 4} />
            </div>
        );
    }

}

export default Charts


/*
{(type != 'Overview' && type != 'More') ? (<div className="chart"> <ChartContext id={params.id} type={type}/> </div>) :
                    
                    (type === 'More') ? (
                        <>
                            <div className="chart">
                                <ChartContext id={params.id} type={'smoke'}/>
                            </div>
                            <div className="chart">
                                <ChartContext id={params.id} type={'alcohol'}/>
                            </div>
                            <div className="chart">
                                <ChartContext id={params.id} type={'benzene'}/>
                            </div>
                        </>
                    ) :

                    (<div>asd</div>)}
*/