import Immutable from 'immutable'
import * as types from './actiontypes'

const initialState = Immutable.Map({
  query: "",
  offset: 0,
  results: undefined,
  error: false,
});

export default function reduce(state=initialState, action) {
  switch (action.type) {
    case types.NEXT_PAGE:
      return state.merge({offset: state.offset + 25})

    case types.PREV_PAGE:
      let prevOffset = state.offset - 25
      if (prevOffset < 0) {
        prevOffset = 0
      }
      return state.merge({offset: prevOffset})

    default:
      return state
  }
}
