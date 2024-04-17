import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BulbList from './../components/bulbs/BulbList';
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';

function Bulbs() {
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
      <div className='m-[20px]'>
          <BulbList bulbs={data}/>
      </div>
    )
}

export default Bulbs