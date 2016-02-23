import * as types from './actiontypes'
import fetch from 'isomorphic-fetch'

export function nextPage() {
  return {type: types.NEXT_PAGE}
}

export function prevPage() {
  return {type: types.PREV_PAGE}
}

export function fetchGifsRequest() {
  alert('fetching')
  return dispatch => {
    dispatch({type: types.FETCH_GIFS_REQUEST})
    return fetch(`http://api.giphy.com/v1/gifs/search?q={query}&api_key={api_key}&offset={offset}`)
      .then(response => response.json())
      .then(json => {alert(json);dispatch(fetchGifSuccess(json))})
    }
}

export function fetchGifsSuccess() {
  return {type: types.FETCH_GIFS_SUCCESS}
}

export function fetchGifsFailure() {
  return {type: types.FETCH_GIFS_FAILURE}
}
