import React from 'react';
import Main from './components/Main';
import PeriodicTable from './components/PeriodicTable';
import './App.css'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/'  element={<Main />} />
      <Route path='/periodic-table' element={<PeriodicTable />} />
    </Routes>
    // <div className='container'>
    // </div>
  );
}

export default App;
