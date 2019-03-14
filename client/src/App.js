import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Rate from './Rate';
import JiraApi from './JiraApi';

class App extends Component {
  constructor() {
    super();
    const jiraApi = new JiraApi;
    this.state = { allIssues : [] };
    this.state.allIssues = jiraApi.retrieveAllOpenIssuesBefore({date: "2019-03-01"});
  }
  
  render() {
    return (
      <div className="App">
       <Rate/>
      </div>
    );
  }
}

export default App;
