import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search(term) {
    $.post('http://127.0.0.1:1128/repos', {'username': term}, function(data) {
      // success
      console.log(data);
      // clear the input field
      $('input').val('');
    });
    console.log(`${term} was searched`);
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }

  componentDidMount() {
    $.get('http://127.0.0.1:1128/repos'), function(data) {
      console.log(data);
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
