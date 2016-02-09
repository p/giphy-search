import React, { Component } from 'react';

var App = React.createClass({
  getInitialState: function() {
    return {query: ""};
  },
  
  onChange: function(e) {
    this.setState({query: e.target.value});
  },
  
  onSubmit: function(e) {
    alert(this.state.query);
    e.preventDefault();
  },
  
  render: function() {
    return (
      <div>
        <h1>Giphy Search</h1>
        <form onSubmit={this.onSubmit}>
          <input type='text' name='query' value={this.state.query}
            onChange={this.onChange} />
          <input type='submit' value='Do it' />
        </form>
      </div>
    );
  },
});

export default App;;
