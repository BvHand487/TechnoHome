import React from 'react';
import list from './components/SensorList'; 

const App = () => {
  const sensors = [
    { name: 'Sensor 1', status: 'active' },
    { name: 'Sensor 2', status: 'paused' },
    { name: 'Sensor 3', status: 'broken' },
  ];

  return <list sensorData={sensors} />;
};

export default App;