import QueryBox from './querybox'
import * as actions from './actions'
import * as types from './actiontypes'
import React, { Component } from 'react';
import request from 'superagent';
import { connect } from 'react-redux'

@connect(state => ({
  query: state.get('query'),
  offset: state.get('offset'),
  searching: state.get('searching'),
  results: state.get('results'),
  error: state.get('error'),
  fake: state.get('fake'),
  showingQueryBox: state.get('showingQueryBox'),
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
    this.props.store.dispatch(actions.giphySearch())
  };
  
  nextPage() {
    this.props.store.dispatch(actions.nextPage())
  }

  prevPage() {
    this.props.store.dispatch(actions.prevPage())
  }
  
  onFakeChange = (e) => {
    this.props.store.dispatch(actions.fake(e.target.checked))
  };

  render() {
    let results = this.props.results.toJS()
    let fake = this.props.fake
    return (
      <div onKeyDown={this.onKeyDown}>
        <h1>Giphy Search</h1>
        <input type='checkbox' id='fake-requests' onChange={this.onFakeChange}
          checked={fake}/>
        <label htmlFor='fake-requests'>
          Fake requests
        </label>
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
        {this.props.showingQueryBox && <QueryBox store={this.props.store}/>}
      </div>
    );
  }
}

export default App;
