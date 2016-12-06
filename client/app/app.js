import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Homepage from './components/Homepage';
import Playlists from './components/Playlists';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import AccountInfo from './components/AccountInfo';
import Room from './components/Room';
import ErrorBanner from './components/errorbanner';
import Login from './components/LoginPage';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

const user_id_logged_in = "3";

var ee = require('event-emitter');
window.emitter = ee({});

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
class LoginPage extends React.Component{
  render(){
    return(
      <div>
        <Login />
      </div>
    )
  }
}

class App extends React.Component{
  render(){
    const { navbar, sidebar, content, player } = this.props

    return (
      <div>
        <div className="sidebar">
          <Sidebar user_id={user_id_logged_in} />
        </div>
        <div className="navbar">
          <Navbar user_id={user_id_logged_in} />
        </div>
        <div className="row">
          <div className="col-md-12">
            <ErrorBanner />
          </div>
        </div>
        <div className="content">
          {content || <Homepage user_id={user_id_logged_in}/>}
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
      <Route path="playlists" components={{content: Playlists}} />
      <Route path="room" components={{content: Room}}/>
      <Route path="homepage" components={{content: Homepage}}/>
      <Route path="login" components={{content: LoginPage}}/>
    </Route>
  </Router>
), document.getElementById('wrapper'))
