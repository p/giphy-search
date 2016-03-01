import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import {Component} from 'react'
import fjs from "functional.js"
import { Router, Route, hashHistory } from 'react-router'

const finalCreateStore = fjs.compose(
  applyMiddleware(thunkMiddleware),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

const reducers = combineReducers({
  app: reducer,
})

const store = finalCreateStore(reducers)

if (typeof window === 'object') {
  window.store = store
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App} />
      <Route path='/:query' component={App} />
      <Route path='/:query/:page' component={App} />
    </Router>
  </Provider>, document.getElementById('root'));
