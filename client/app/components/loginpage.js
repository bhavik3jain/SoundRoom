import React from 'react';
import {getRoomIds, joinRoom} from '../server';
// import {writeDocument} from '../database';
import {Link, browserHistory} from 'react-router';
import ErrorBanner from './errorbanner'



export default class LoginPage extends React.Component{
  render() {
    return (
      <div>
        <div className = "col-md-4"></div>
          <div className = "col-md-4">
            <div id="login_room_panel" className="panel panel-default panel-joinroom">
              <div className="panel-body">
                <form action="" method="post" id="user-form">
                  <input name="username" id="account-input-box" type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon2" />

                  <input name="password" id="account-input-box" type="text" className="form-control" placeholder="Password" aria-describedby="basic-addon2" />
                  <center>
                    <button type = "button" className="btn btn-default" id="btn1">Login</button>
                  </center>
                </form>

                <center>
                  <p id ="no-account">Don't have an account? <a id="no-account-sign-up" href="#">Sign Up</a></p>
                </center>
              </div>
            </div>
          </div>
        <div className = "col-md-4"></div>
      </div>
    );
  }
}
