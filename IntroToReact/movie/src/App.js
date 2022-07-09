import './App.css';
import React from 'react';
import Navbar from './Components/Navbar'
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourite';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path='/' element={<><Banner/><Movies/></>}/>
          <Route path='/favourites' element={<Favourites/>} />
      </Routes>
      {/* <Banner/> */}
      {/* <Movies/> name="udai" */}
      {/* <Favourite/> */}
    </Router>
  );
}

export default App;
