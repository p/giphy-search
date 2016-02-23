import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { combineReducers, createStore, applyMiddleware } from 'redux'
//import { Provider } from 'react-redux'
import * as reducers from './reducers'
import thunkMiddleware from 'redux-thunk'
import {Component} from 'react'

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

const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(
  thunkMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>, document.getElementById('root'));
