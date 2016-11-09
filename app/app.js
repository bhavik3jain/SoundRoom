import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

class App extends React.Component{
  render(){
    return (
      <div>
        <Sidebar />
        <Navbar />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('wrapper'));
