import * as actions from './actions'
import * as types from './actiontypes'
import React, { Component } from 'react';
import request from 'superagent';
import keydown from 'react-keydown';
import { connect } from 'react-redux'

@connect(state => ({
  query: state.default.get('query'),
  offset: state.default.get('offset'),
  searching: state.default.get('searching'),
  results: state.default.get('results'),
}))
class App extends Component {
  constructor(props) {
  //debugger
    super(props);
    //this.store = props.store
    //this.state = {query: "", error: false, results: undefined, offset: 0};
  }

  componentWillReceiveProps(props) {
    //debugger;
  }

  componentDidMount() {
    //debugger;
  }

  onChange = (e) => {
    this.props.store.dispatch(actions.setQuery(e.target.value))
  };

  onSubmit = (e) => {
    e.preventDefault()
    this.props.store.dispatch(actions.giphySearch(this.props.query, this.props.offset))
    return
  debugger
    this.setState({offset: 0});
    this.search();

    e.preventDefault();
  };

  onResults = (err, res) => {
    if (err) {
      this.setState({error: err});
    } else {
      this.setState({results: res.body.data});
    }
  };

  @keydown('n')
  nextPage() {
  //alert(1)
  debugger
    const {store} = this.props
    store.dispatch({type: types.NEXT_PAGE})
    return
    if (this.state.results === undefined) {
      return;
    }
    this.setState({offset: this.state.offset+25});
    this.search();
  }

  @keydown('p')
  prevPage() {
    const {store} = this.props
    store.dispatch({type: types.PREV_PAGE})
    return
    if (this.state.offset != new_offset) {
      this.setState({offset: new_offset});
      this.search();
    }
  }

  search() {
  debugger;
  this.props.store.dispatch(actions.nextPage())
  return
    const query = this.state.query;
    const api_key = 'dc6zaTOxFJmzC';
    request.get('http://api.giphy.com/v1/gifs/search').
      query({q: query, api_key: api_key, offset: this.state.offset}).
      end(this.onResults);
  }

  render() {
  //debugger
    let results = this.props.results.toJS()
    return (
      <div>
        <h1>Giphy Search</h1>
        <form onSubmit={this.onSubmit}>
          <input type='text' name='query' value={this.props.query}
            onChange={this.onChange} />
          <input type='submit' value='Do it' />
        </form>
        <p>Query {this.props.query}</p>
        {this.props.searching &&
          <p>Searching</p>
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
