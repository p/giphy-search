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
  //alert(['reducing', action.type])
  switch (action.type) {
    case types.SET_QUERY:
      return state.merge({query: action.query})
      
    case types.NEXT_PAGE:
    //debugger
      if (state.results === undefined) {
        //return state
      }
      return dispatch => {
        dispatch(actions.nextPage)
      }
      
      store.dispatch(actions.fetchGifsRequest()).then(()=>
        alert(1)
      )
      return state.merge({offset: state.offset + 25})

    case types.PREV_PAGE:
      if (state.results === undefined) {
        return state
      }
      let prevOffset = state.offset - 25
      if (prevOffset < 0) {
        prevOffset = 0
      }
      if (offset != prevOffset) {
        store.dispatch(actions.fetchGifsRequest()).then(()=>
          alert(1)
        )
      }
      return state.merge({offset: prevOffset})

    case types.SEARCH_GIPHY:
      //debugger
      let query = state.toJS().query
      //giphySearch().then(
      return state

    case types.FETCH_GIFS_REQUEST:
    //debugger
      return state.merge({searching: true})

    case types.FETCH_GIFS_SUCCESS:
    //debugger
      return state.merge({searching: false, results: action.results})


    default:
      return state
  }
}
