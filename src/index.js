import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import {Component} from 'react'
import { Router, Route, hashHistory } from 'react-router'
import {store, history} from './store'

if (typeof window === 'object') {
  window.store = store
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
      <Route path='/:searchedQuery' component={App} />
      <Route path='/:searchedQuery/:page' component={App} />
    </Router>
  </Provider>, document.getElementById('root'));
