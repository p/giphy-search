import * as actions from './actions'
import * as types from './actiontypes'
import React, { Component } from 'react';
import request from 'superagent';
import keydown from 'react-keydown';
import { connect } from 'react-redux'

@connect(state => ({
  query: state.get('query'),
  offset: state.get('offset'),
  searching: state.get('searching'),
  results: state.get('results'),
  error: state.get('error'),
}))
class App extends Component {
  constructor(props) {
    super(props);
  }

  onChange = (e) => {
    this.props.store.dispatch(actions.setQuery(e.target.value))
  };

  onSubmit = (e) => {
    e.preventDefault()
    this.props.store.dispatch(actions.giphySearch(this.props.query, this.props.offset))
  };

  @keydown('n')
  nextPage() {
    const {store} = this.props
    this.props.store.dispatch(actions.nextPage())
  }

  @keydown('p')
  prevPage() {
    const {store} = this.props
    store.dispatch(actions.prevPage())
  }

  render() {
    let results = this.props.results.toJS()
    return (
      <div>
        <h1>Giphy Search</h1>
        <form onSubmit={this.onSubmit}>
          <input type='text' name='query' value={this.props.query}
            onChange={this.onChange} />
          <input type='submit' value='Do it' />
        </form>
        {this.props.searching &&
          <p>Searching</p>
        }
        {this.props.error &&
          <p>There was an error searching Giphy! What now??</p>
        }
        <input type='button' value='Next page' onClick={this.nextPage.bind(this)}/>
        <input type='button' value='Prev page' onClick={this.prevPage.bind(this)}/>
        { this.props.store.error &&
          <div>
            <p>Error</p>
            <p>{this.props.store.error}</p>
          </div>
        }
        { results.length > 0 &&
          <div>
            <h2>Results</h2>
            {results.map(function(result, i) {
              return <div key={result.id} style={{float:'left', margin:'5px'}}>
                <img src={result.images.fixed_height_small.url} />
              </div>
            })}
          </div>
        }
      </div>
    );
  }
}

export default App;;
