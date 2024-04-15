import { CircularProgress } from '@mui/material';
import React from 'react';
import useSWR from 'swr';
import Bulb from './Bulb';
import styles from './bulbs.css';

function BulbList()
{
    const { data, error, isLoading } = useSWR(`http://localhost:10000/api/lamps`, (uri) => fetch(uri)
        .then(res => res.json()));

    if (isLoading)
        return <CircularProgress />;

    if (error)
    {
        console.log(error)
        return <div>Error!</div>
    }

    return (
        <div className="bulb-list">
            {data.map(s => {
                return (
                    <Bulb key={s.lampId} id={s.lampId} name={s.name} enabled={s.enabled} dim={s.dim} />
                );
            })}
        </div>
    )
}

export default BulbList;