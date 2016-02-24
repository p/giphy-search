import * as types from './actiontypes'
import fetch from 'isomorphic-fetch'
import 'promise'
import './config'

export function setQuery(query) {
  return {type: types.SET_QUERY, query}
}

export function nextPage() {
  return {type: types.NEXT_PAGE}
}

export function prevPage() {
  return {type: types.PREV_PAGE}
}

export function searchGiphy() {
  return dispatch => {
    dispatch({type: types.FETCH_GIFS_REQUEST})
  }
}

function realGiphySearch(dispatch, query, offset) {
  return fetch(`http://api.giphy.com/v1/gifs/search?q={query}&api_key={Config.api_key}&offset={offset}`)
    .then(response => response.json())
    .then(json => {alert(json);dispatch(fetchGifsSuccess(json))})
}

function fakeGiphySearch(dispatch, query, offset) {
  let promise = new Promise((resolve, reject) => {
  debugger
    resolve([{
      id: 1, images: {fixed_height_small: {url: 'http://tires.tirerack.com/thumb.php?f=//cdn.app.compendium.com/uploads/user/3830be5e-cdd1-486f-a4e4-308bac9591c9/d217dcb7-b47f-4346-b0ae-8f8c650d50b5/Image/20c033b684de91bd9a4a5b720a103383/bfg_gforce_r1_pdpcrop.jpg&s=190'}},
      }]
    )
  }).then(json => {
      debugger
      dispatch(fetchGifsSuccess(json))
      }
    )
  return promise
}

export function giphySearch(query, offset) {
  //return realGiphySearch(query, offset)
  return dispatch => {
    fakeGiphySearch(dispatch, query, offset)
    dispatch({type: types.FETCH_GIFS_REQUEST})
  }
}

export function fetchGifsRequest() {
  alert('fetching')
  return dispatch => {
    dispatch({type: types.FETCH_GIFS_REQUEST})
    return giphySearch()
  }
}

export function fetchGifsSuccess(results) {
debugger
  return {type: types.FETCH_GIFS_SUCCESS, results: results}
}

export function fetchGifsFailure() {
  return {type: types.FETCH_GIFS_FAILURE}
}
