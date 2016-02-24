import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
//import * as reducers from './reducers'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import {Component} from 'react'
var fjs = require("functional.js");

/*
class Provider extends Component {
  getChildContext() {
    return {store: this.props.store}
  }

  render() {
    return this.props.children
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}
*/

//const reducer = combineReducers(reducers)
//const reducer = reduce

const finalCreateStore = fjs.compose(
  applyMiddleware(thunkMiddleware),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(reducer)
//console.log(store.getState())

if (typeof window === 'object') {
  window.store = store
}

// state:
// query
// results
// offset

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>, document.getElementById('root'));
