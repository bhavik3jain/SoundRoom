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
                <h2 id="login_room_text">Login</h2>
                <input type="text" className="form-control" id="userInput" placeholder="Enter user ID to login " />
                <input type="text" className="form-control" id="userInput" placeholder="Enter password to login " />
                <center>
                    <button type = "button" className="btn btn-default" id="btn1">Login</button>
                </center>
              </div>
            </div>
          </div>
        <div className = "col-md-4"></div>
      </div>
    );
  }
}
