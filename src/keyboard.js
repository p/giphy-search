import * as actions from './actions'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import Mousetrap from 'mousetrap'

@connect(state => ({
  query: state.get('query'),
  showingQueryBox: state.get('showingQueryBox'),
}))
class Keyboard extends Component {
  componentDidMount() {
    Mousetrap.bind('s', this.showQueryBox)
    Mousetrap.bind('n', this.nextPage)
    Mousetrap.bind('p', this.prevPage)
  }
  
  componentWillUnmount() {
    Mousetrap.unbind(['s', 'n', 'p'])
  }
  
  showQueryBox = (e) => {
    if (!this.props.showingQueryBox) {
      e.preventDefault()
      this.props.store.dispatch(actions.showQueryBox())
    }
  };
  
  nextPage = (e) => {
    if (!this.props.showingQueryBox) {
      e.preventDefault()
      this.props.store.dispatch(actions.nextPage())
    }
  };
  
  prevPage = (e) => {
    if (!this.props.showingQueryBox) {
      e.preventDefault()
      this.props.store.dispatch(actions.prevPage())
    }
  };
  
  render() {
    return this.props.children
  }
}

export default Keyboard
