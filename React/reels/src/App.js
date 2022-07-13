import './App.css';
import Signup from './Components/Signup'
import Login from './Components/Login';
import Feed from './Components/feed'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {AuthProvider} from './Context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Feed/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
