import Mousetrap from 'mousetrap'
import React, { Component } from 'react';
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import * as actions from './actions'

@connect(state => ({
  query: state.app.get('query'),
}))
class QueryBox extends Component {
  focusInput(inputComponent) {
    if (inputComponent) {
      const elt = ReactDom.findDOMNode(inputComponent)
      elt.focus()
      elt.setSelectionRange(0, elt.value.length)
    }
  }

  componentDidMount() {
    Mousetrap.bind('esc', this.hide)
  }

  componentWillUnmount() {
    Mousetrap.unbind(['esc'])
  }

  onChange = (e) => {
    this.props.dispatch(actions.setQuery(e.target.value))
  };

  onSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(actions.giphySearch({offset: 0}))
    return false
  };

  hide = (e) => {
    e.preventDefault()
    this.props.dispatch(actions.hideQueryBox())
  };

  keyDownHandler = (e) => {
    if (e.keyCode == 27) {
      this.hide(e)
    }
  };

  render() {
    // why does having onsubmit on the form still submit the form?
    return <div style={queryBoxStyle} onClick={this.hide}>
      <form onSubmit={this.onSubmit} style={formStyle}>
        <input
          ref={ this.focusInput }
          type='text' name='query' value={this.props.query}
          onKeyDown={this.keyDownHandler.bind(this)}
          onChange={this.onChange} />
        <input type='submit' value='Search' onClick={this.onSubmit} />
      </form>
    </div>;
  }
}

const queryBoxStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: 'rgba(0,0,0,0.8)',
  zIndex: 10,
  opacity: 1,
  //pointerEvents: 'none',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const formStyle = {

}

export default QueryBox
