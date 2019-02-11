import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import './App.css'
import * as serviceWorker from './serviceWorker';


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <App store={store} />,
  document.getElementById("root")
);
serviceWorker.register();