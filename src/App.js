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
import Joyride from 'react-joyride'

function App() {
  const loadingStore = useSelector((state) => state.loading);
  const reactants = useSelector(state=> state.reactions.reactants);
  const { loading, error, errorMessage, success, successMessage } = loadingStore;
  const [open, setOpen] = useState(false);
  const isWelcome = localStorage.getItem('isWelcome');
  
  const isWalkThrough = localStorage.getItem('isWalkthrough');
  const [run, setRun] = useState(false);

  const steps = [
      {
        content: <h2>Welcome! Let's take a quick tour of this project.</h2>,
        locale: { skip: <strong>SKIP</strong> },
        placement: "center",
        target: 'body',
      },
      {
        content: <h2>Here, you can add a reactant to start your chemical reaction.</h2>,
        placement: "right",
        target: '#addReactant',
        title: 'Add a Reactant',
      },
      {
        content: <h2>This button takes you to the periodic table, where you can select elements.</h2>,
        placement: "bottom",
        target: '#periodicTableButton',
        title: 'Periodic Table',
      },
      {
        content: <h2>Choose your preferred language: Hindi, English, or Urdu.</h2>,
        placement: "bottom",
        target: '#language',
        title: 'Select Language',
      },
      {
        content: <h2>Sign up here to save your progress and access more features.</h2>,
        placement: "bottom",
        target: '#signUp',
        title: 'Sign Up',
      },
      {
        content: <h2>Once you've added reactants, click here to perform your chemical reaction!</h2>,
        placement: "left",
        target: '#performReaction',
        title: 'Perform Reaction',
      }
    ];
  
  useEffect(()=>{
    if( !isWelcome && !isWalkThrough){
      setOpen(true);
    }
  },[isWelcome,isWalkThrough])

  return (
    <>
      {error && <ErrorSnackBar message={errorMessage} open={error} />}
      {success && <SuccessSnackBar message={successMessage} open={success} />}
      <LoadingModal loading={reactants.length ? false : loading} />
      <WelcomeModal open={open} setRun={setRun} setOpen={setOpen} />
      <Joyride 
        callback={()=>{ localStorage.setItem('isWalkthrough',true);}}
        continuous
        steps={steps}
        run={run}
        hideCloseButton
        scrollToFirstStep 
        showSkipButton
        showProgress
      />
      <Routes>
        <Route path='/'  element={<Main />} />
        <Route path='/periodic-table' element={<PeriodicTable id='periodicTable' />} />
      </Routes>
      <Disclaimer />
    </>
  );
}

export default App;
