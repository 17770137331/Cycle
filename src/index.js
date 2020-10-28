import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router'
import {Provider} from 'react-redux'
import configStore from './redux/store/index'
import * as serviceWorker from './serviceWorker'
const store = configStore()
ReactDOM.render(
  <Provider store={store}>
    <Router></Router>
  </Provider>
  ,
  document.getElementById('root')
);
serviceWorker.unregister()
