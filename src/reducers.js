import Immutable from 'immutable'
import * as types from './actiontypes'
import * as actions from './actions'
import {load} from './persist'

const initialState = Immutable.Map({
  query: undefined,
  offset: undefined,
  results: Immutable.fromJS([]),
  error: false,
  searching: false,
  fake: load('fake') == 'true',
  showingQueryBox: false,
});

export default function reduce(state=initialState, action) {
  switch (action.type) {
    case types.SET_QUERY:
      return state.merge({query: action.query})
      
    case types.SET_OFFSET:
      return state.merge({offset: action.offset})
      
    case types.FETCH_GIFS_REQUEST:
      return state.merge({searching: true})

    case types.FETCH_GIFS_SUCCESS:
      return state.merge({searching: false, results: action.results,
        query: action.query, offset: action.offset})

    case types.FETCH_GIFS_FAILURE:
      return state.merge({searching: false, error: true})

    case types.FAKE_CHANGE:
      return state.merge({fake: action.fake})

    case types.SHOW_QUERY_BOX:
      return state.merge({showingQueryBox: true})

    case types.HIDE_QUERY_BOX:
      return state.merge({showingQueryBox: false})

    default:
      return state
  }
}
