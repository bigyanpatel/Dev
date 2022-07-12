import './App.css';
// import Signup from './Components/Signup'
import Login from './Components/Login';
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      {/* <Signup/> */}
      <Login/>
    </BrowserRouter>
    
  );
}

export default App;
