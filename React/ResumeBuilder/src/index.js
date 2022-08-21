import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {legacy_createStore} from 'redux';
import {provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './redux/reducers/rootReducer';

const reduxStore = legacy_createStore(rootReducer, composeWithDevTools());

ReactDOM.render(

    <BrowserRouter>
    <provider store = {reduxStore}>
      <App />
    </provider>
    </BrowserRouter>
,
  document.getElementById('root')
);