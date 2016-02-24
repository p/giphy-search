import Immutable from 'immutable'
import * as types from './actiontypes'
import * as actions from './actions'

const initialState = Immutable.Map({
  query: "",
  offset: 0,
  results: Immutable.fromJS([]),
  error: false,
  searching: false,
});

export default function reduce(state=initialState, action) {
  switch (action.type) {
    case types.SET_QUERY:
      return state.merge({query: action.query})
      
    case types.SEARCH_GIPHY:
      return state

    case types.FETCH_GIFS_REQUEST:
      return state.merge({searching: true})

    case types.FETCH_GIFS_SUCCESS:
      return state.merge({searching: false, results: action.results,
        query: action.query, offset: action.offset})

    case types.FETCH_GIFS_FAILURE:
      return state.merge({searching: false, error: true})

    default:
      return state
  }
}
