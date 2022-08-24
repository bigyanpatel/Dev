import React from 'react';
import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import './App.css';
import Homepage from './Components/Homepage';
import Add from './Components/Add'
import Edit from './Components/Edit'
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className='App'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element= {<Homepage/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </div>
  );
}

export default App;
