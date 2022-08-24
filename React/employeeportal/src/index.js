import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router} from "react-router-dom"
import {createStore} from 'redux';
import employeeReducer from './redux/reducers/employeeReducer';
import {composeWithDevTools} from "redux-devtools-extension";
import { Provider } from 'react-redux';

const store = createStore(employeeReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  
    
);

