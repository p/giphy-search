import React, { Component } from 'react';
import request from 'superagent';
import keydown from 'react-keydown';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {query: "", error: false, results: undefined};
  }
  
  onChange = (e) => {
    this.setState({query: e.target.value});
  };
  
  onSubmit = (e) => {
    //alert([this.state.query, request]);
    
    const query = this.state.query;
    const api_key = 'dc6zaTOxFJmzC';
    request.get('http://api.giphy.com/v1/gifs/search').
      query({q: query, api_key: api_key}).end(this.onResults);
    
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
    alert('next');
  }
  
  render() {
    return (
      <div>
        <h1>Giphy Search</h1>
        <form onSubmit={this.onSubmit}>
          <input type='text' name='query' value={this.state.query}
            onChange={this.onChange} />
          <input type='submit' value='Do it' />
        </form>
        { this.state.error &&
          <div>
            <p>Error</p>
            <p>{this.state.error}</p>
          </div>
        }
        { this.state.results &&
          <div>
            <h2>Results</h2>
            {this.state.results.map(function(result, i) {
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
