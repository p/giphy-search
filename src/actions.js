import * as types from './actiontypes'
import fetch from 'isomorphic-fetch'
import 'promise'
import Config from './config'
import {store} from './persist'

export function setQuery(query) {
  return {type: types.SET_QUERY, query}
}

export function nextPage() {
  return (dispatch, getState) => {
    const offset = getState().app.get('offset')
    const nextOffset = offset+25
    dispatch(giphySearch({offset: nextOffset}))
    return {type: types.SET_OFFSET, offset: nextOffset}
  }
}

export function prevPage() {
  return (dispatch, getState) => {
    const offset = getState().app.get('offset')
    let nextOffset = offset-25
    if (nextOffset < 0) {
      nextOffset = 0
    }
    if (nextOffset !== offset) {
      dispatch(giphySearch({offset: nextOffset}))
    }
    return {type: types.SET_OFFSET, offset: nextOffset}
  }
}

function realGiphySearch(dispatch, query, offset) {
  return fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${Config.api_key}&offset=${offset}`)
    .then(response => response.json())
    .then(json => {dispatch(fetchGifsSuccess(json.data, query, offset))})
}

function fakeGiphySearch(dispatch, query, offset) {
  let promise = new Promise((resolve, reject) => {
    resolve([{
      id: 1, images: {fixed_height_small: {url: 'http://tires.tirerack.com/thumb.php?f=//cdn.app.compendium.com/uploads/user/3830be5e-cdd1-486f-a4e4-308bac9591c9/d217dcb7-b47f-4346-b0ae-8f8c650d50b5/Image/20c033b684de91bd9a4a5b720a103383/bfg_gforce_r1_pdpcrop.jpg&s=190'}},
      }]
    )
  }).then(json => {
      dispatch(fetchGifsSuccess(json, query, offset))
      }
    )
  return promise
}

export function giphySearch(options) {
  options = options || {}
  return (dispatch, getState) => {
    const query = options.query || getState().app.get('query')
    var offset
    if (options.offset !== undefined) {
      offset = options.offset
    } else {
      offset = getState().app.get('offset')
    }
    const fake = getState().app.get('fake')
    let method
    if (fake) {
      method = fakeGiphySearch
    } else {
      method = realGiphySearch
    }
    method(dispatch, query, offset)
    dispatch({type: types.FETCH_GIFS_REQUEST})
  }
}

export function fetchGifsSuccess(results, query, offset) {
  return {type: types.FETCH_GIFS_SUCCESS, results: results, query: query, offset: offset}
}

export function fetchGifsFailure() {
  return {type: types.FETCH_GIFS_FAILURE}
}

export function fake(fakeStatus) {
  return dispatch => {
    store('fake', fakeStatus)
    dispatch({type: types.FAKE_CHANGE, fake: fakeStatus})
  }
}

export function showQueryBox() {
  return {type: types.SHOW_QUERY_BOX}
}

export function hideQueryBox() {
  return {type: types.HIDE_QUERY_BOX}
}
