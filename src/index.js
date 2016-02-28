import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Keyboard from './keyboard';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import {Component} from 'react'
var fjs = require("functional.js");

const finalCreateStore = fjs.compose(
  applyMiddleware(thunkMiddleware),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(reducer)

if (typeof window === 'object') {
  window.store = store
}

ReactDOM.render(
  <Provider store={store}>
    <Keyboard store={store}>
      <App store={store} />
    </Keyboard>
  </Provider>, document.getElementById('root'));
