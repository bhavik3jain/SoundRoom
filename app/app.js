import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Playlists from './components/Playlists';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

class App extends React.Component{
  render(){
    return (
      <div>
        <Sidebar />
        <Navbar />
        //<Playlists />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('wrapper'));
