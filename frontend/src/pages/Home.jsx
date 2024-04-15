import Description from '../components/home/Description';
import Title from '../components/home/Title';
import Overview from '../components/home/Overview';
import React from 'react';
import './../components/home/home.css';

function Home() {
  return (
    <div className='text-container'>
        <Title />
        <div className='divider'></div>
        <Description />
        {/* <Overview /> */}
    </div>
  )
}

export default Home