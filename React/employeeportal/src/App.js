import React from 'react';
import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import './App.css';
import Homepage from './Components/Homepage';
import Add from './Components/Add'
import Edit from './Components/Edit'
import Login from './Components/login';

function App() {
  return (
    <div className='App'>
      <ToastContainer/>
      <Routes>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/' element= {<Homepage/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </div>
  );
}

export default App;
