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

class PlaylistsPage extends React.Component {
  render() {
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
    const user_id_logged_in = "2";

    return (
      <div>
        <div className="sidebar">
          {sidebar || <Sidebar user_id={user_id_logged_in} />}
        </div>
        <div className="navbar">
          {navbar || <Navbar />}
        </div>
        <div className="content">
          {content || <AccountInfo user_id={user_id_logged_in} />}
        </div>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/account/(:user_id)" components={{ content: AccountInfo, sidebar: Sidebar }}/>
      <Route path="createroom" components={{ content: CreateRoom, sidebar: Sidebar }}/>
      <Route path="joinroom" components={{ content: JoinRoom, sidebar: Sidebar }}/>
      <Route path="playlists" components={{ content: Playlists, sidebar: Sidebar }}/>
    </Route>
  </Router>
), document.getElementById('wrapper'))
