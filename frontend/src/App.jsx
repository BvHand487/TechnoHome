import React from 'react';
// import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Devices from './pages/Devices';
import Bulbs from './pages/Bulbs';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/devices/*' element={<Devices />} />
          <Route path='/bulbs' element={<Bulbs />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App