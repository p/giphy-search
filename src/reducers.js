import Immutable from 'immutable'
import * as types from './actiontypes'
import * as actions from './actions'

const initialState = Immutable.Map({
  query: "",
  offset: 0,
  results: undefined,
  error: false,
});

export default function reduce(state=initialState, action) {
  alert(['reducing', action.type])
  switch (action.type) {
    case types.NEXT_PAGE:
    debugger
      if (state.results === undefined) {
        //return state
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

    //case types.FETCH_GIFS_SUCCESS:


    default:
      return state
  }
}