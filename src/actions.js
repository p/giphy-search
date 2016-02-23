import * as types from './actiontypes'
import fetch from 'isomorphic-fetch'
import 'promise'

export function nextPage() {
  return {type: types.NEXT_PAGE}
}

export function prevPage() {
  return {type: types.PREV_PAGE}
}

function realGiphySearch() {
  return fetch(`http://api.giphy.com/v1/gifs/search?q={query}&api_key={api_key}&offset={offset}`)
    .then(response => response.json())
    .then(json => {alert(json);dispatch(fetchGifSuccess(json))})
}

function fakeGiphySearch() {
  let promise = new Promise((resolve, reject) => 
    resolve()
  )
  return promise
}

function giphySearch() {
  return fakeGiphySearch()
}

export function fetchGifsRequest() {
  alert('fetching')
  return dispatch => {
    dispatch({type: types.FETCH_GIFS_REQUEST})
    return giphySearch()
  }
}

export function fetchGifsSuccess() {
  return {type: types.FETCH_GIFS_SUCCESS}
}

export function fetchGifsFailure() {
  return {type: types.FETCH_GIFS_FAILURE}
}
