import { routerMiddleware } from 'react-router-redux'
import fjs from "functional.js"
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import {routerReducer} from './routerreducer'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, hashHistory } from 'react-router'

const finalCreateStore = fjs.compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(routerMiddleware(hashHistory)),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

const reducers = combineReducers({
  app: reducer,
  routing: routerReducer,
})

export const store = finalCreateStore(reducers)

export const history = syncHistoryWithStore(hashHistory, store,
  {selectLocationState: (state) => {
    return state.routing.toJS()
  }})
