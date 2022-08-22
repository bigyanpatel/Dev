import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './redux/reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import { Provider } from 'react-redux';

const reduxStore = createStore(rootReducer,composeWithDevTools())  //binding for redux to get firestore

ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
,
  document.getElementById('root')
); 