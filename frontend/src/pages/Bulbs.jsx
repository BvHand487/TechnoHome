import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BulbList from './../components/bulbs/BulbList';

function Bulbs() {
  return (
    <div className='split'>
        <BulbList />
    </div>
  )
}

export default Bulbs