import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      repoCount: 0
    }
  }

  addRepos() {
    $.get('http://127.0.0.1:1128/repos', (data, status) => {
      console.log('get: ', status);
      console.log(data); // this is the array of react divs

      this.setState({
        repos: data.repos,
        repoCount: data.count
      });

    }, 'json');
  }

  search(term) {
    $.post('http://127.0.0.1:1128/repos', {'username': term}, (data) => {
      // success
      console.log(data);
      // clear the input field
      $('input').val('');
      // then we should get this new data
      // in the future maybe the post could return the same data as a get request
      this.addRepos();
    });
    console.log(`${term} was searched`);
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} repoCount={this.state.repoCount}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }

  componentDidMount() {
    this.addRepos();
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
