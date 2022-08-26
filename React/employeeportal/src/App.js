import React from 'react';
import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import './App.css';
import Homepage from './Components/Homepage';
import Add from './Components/Add'
import Edit from './Components/Edit'
import Login from './Components/login';
import Profile from './Components/Profile';
import Test from './Components/Test'

function App() {
  return (
    <div className='App'>
      <ToastContainer/>
      <Routes>
        <Route path='/' element= {<Login/>}/>
        <Route path='/home' element= {<Homepage/>}/>
        <Route path='/profile/:id' element = {<Profile/>}/>
        <Route path='/add/:id' element={<Add/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </div>
  );
}

export default App;
