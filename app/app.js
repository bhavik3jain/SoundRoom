import React from 'react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Homepage from './components/Homepage';
import Playlists from './components/Playlists';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import AccountInfo from './components/AccountInfo';
import Room from './components/Room';

import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

class App extends React.Component{
    render(){
        const user_id_logged_in = "1";
        return (
          <div>
            <Sidebar user_id={user_id_logged_in}/>
            <Navbar />
            <Homepage />
          </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('wrapper'));
