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
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

const user_id_logged_in = "2";

class SidebarPage extends React.Component {
  render() {
    return (
      <div>
        <Sidebar user_id={user_id_logged_in} />
      </div>
    )
  }
}

class AccountPage extends React.Component {
  render() {
    return (
      <div>
        <AccountInfo user_id={user_id_logged_in} />
      </div>
    )
  }
}

class PlaylistPage extends React.Component{
  render(){
    return (
      <div>
        <Playlists />
      </div>
    )
  }
}

class App extends React.Component{
  render(){
    const { navbar, sidebar, content } = this.props

    return (
      <div>
        <div className="sidebar">
          {sidebar || <Sidebar user_id={user_id_logged_in} />}
        </div>
        <div className="navbar">
          {navbar || <Navbar />}
        </div>
        <div className="content">
          {content || <Homepage />}
        </div>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="account" components={{content: AccountPage}}/>
      <Route path="createroom" components={{content: CreateRoom}}/>
      <Route path="joinroom" components={{content: JoinRoom}}/>
      <Route path="playlists/:playlistData" components={{content: Playlists}}/>
      <Route path="room" components={{content: Room}}/>
    </Route>
  </Router>
), document.getElementById('wrapper'))
