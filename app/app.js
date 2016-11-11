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

const user_id_logged_in = "1";

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
      <Route path="account" components={{ content: AccountPage, sidebar: SidebarPage }}/>
      <Route path="createroom" components={{ content: CreateRoom, sidebar: SidebarPage }}/>
      <Route path="joinroom" components={{ content: JoinRoom, sidebar: SidebarPage }}/>
      <Route path="playlists" components={{ content: Playlists, sidebar: SidebarPage }}/>
    </Route>
  </Router>
), document.getElementById('wrapper'))
