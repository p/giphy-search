import { push } from 'react-router-redux'
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
    .then(response => {
      const json = response.json().then(resp2 => {
        dispatch(fetchGifsSuccess(resp2.data, query, offset))
      })
    }, response => {
      dispatch(fetchGifsFailure(response.message))
    })
}

const gif1 = {
  id: 1, images: {fixed_height_small: {url: require('../static/fake/small1.jpg')},
    original: {url: require('../static/fake/big1.jpg')}},
  };
const gif2 = {
  id: 2, images: {fixed_height_small: {url: require('../static/fake/small2.jpg')},
    original: {url: require('../static/fake/big2.jpg')}},
  };
const gif3 = {
  id: 3, images: {fixed_height_small: {url: require('../static/fake/small3.jpg')},
    original: {url: require('../static/fake/big3.jpg')}},
  };

function fakeGiphySearch(dispatch, query, offset) {
  let promise = new Promise((resolve, reject) => {
    const data = [
      Object.assign({}, gif1, {id: 10}),
      Object.assign({}, gif2, {id: 11}),
      Object.assign({}, gif3, {id: 12}),
      Object.assign({}, gif1, {id: 13}),
      Object.assign({}, gif2, {id: 14}),
      Object.assign({}, gif3, {id: 15}),
      Object.assign({}, gif2, {id: 16}),
      Object.assign({}, gif3, {id: 17}),
      Object.assign({}, gif1, {id: 18}),
      Object.assign({}, gif2, {id: 19}),
    ]
    resolve({data: data}
    )
  }).then(json => {
      dispatch(fetchGifsSuccess(json.data, query, offset))
      }
    )
  return promise
}

export function giphySearch(options) {
  options = options || {}
  return (dispatch, getState) => {
    let query = options.query
    if (query === undefined) {
      query = getState().app.get('query')
    }
    var offset
    if (options.offset !== undefined) {
      offset = options.offset
    } else {
      offset = getState().app.get('offset')
    }
    if (query === '') {
      offset = 0
      dispatch(fetchGifsSuccess([], query, offset))
    } else {
      const fake = getState().app.get('fake')
      let method
      if (fake) {
        method = fakeGiphySearch
      } else {
        method = realGiphySearch
      }
      dispatch({type: types.SET_SEARCHED_QUERY, searchedQuery: query})
      method(dispatch, query, offset)
      dispatch({type: types.FETCH_GIFS_REQUEST})
    }
    let url = '/' + query
    if (offset) {
      url += '/' + offset
    }
    dispatch(push(url))
  }
}

export function fetchGifsSuccess(results, query, offset) {
  return {type: types.FETCH_GIFS_SUCCESS, results: results, query: query, offset: offset}
}

export function fetchGifsFailure(error) {
  return {type: types.FETCH_GIFS_FAILURE, error: error}
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
