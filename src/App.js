import React, { useEffect, useState } from 'react';
import Main from './components/Main';
import PeriodicTable from './components/PeriodicTable';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingModal from './components/LoadingModal';
import ErrorSnackBar from './components/ErrorSnackBar';
import SuccessSnackBar from './components/SuccessSnackBar';
import Disclaimer from './components/Disclamer';
import { WelcomeModal } from './components/WelcomeModal';

function App() {
  const loadingStore = useSelector((state) => state.loading);
  const reactants = useSelector(state=> state.reactions.reactants);
  const { loading, error, errorMessage, success, successMessage } = loadingStore;
  const [open, setOpen] = useState(false);
  const isWelcome = localStorage.getItem('isWelcome');
  useEffect(()=>{
    if( !isWelcome ){
      setOpen(true);
    }
  },[isWelcome])

  return (
    <>
      {error && <ErrorSnackBar message={errorMessage} open={error} />}
      {success && <SuccessSnackBar message={successMessage} open={success} />}
      <LoadingModal loading={reactants.length ? false : loading} />
      <WelcomeModal open={open} setOpen={setOpen} />
      <Routes>
        <Route path='/'  element={<Main />} />
        <Route path='/periodic-table' element={<PeriodicTable />} />
      </Routes>
      <Disclaimer />
    </>
  );
}

export default App;
