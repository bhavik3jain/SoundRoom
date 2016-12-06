import React from 'react';
import {Link} from 'react-router';
import {getUserInfo} from '../server';

export default class Navbar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      account_info: {}
    };
  }


  getAccountData() {
    getUserInfo(this.props.user_id, (accountInfo) => {
      this.setState({"account_info": accountInfo});
    });
  }

  componentDidMount() {
    this.getAccountData();
  }

  render(){
    const proPicStyle = {
      width: '100%',
      height: '100%'
    };
    return (
      <div>
        <nav className="navbar navbar-light bg-faded" id="home_page_navbar">
          <div className="col-lg-3"></div>
          <div className="col-lg-6" id="title">
            <h3>Welcome to</h3>
            <h1>SoundRoom</h1>
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-1">
            <ul className="nav navbar-nav">
              <li className="dropdown top-dropdown">
                <input type="image" src={this.state.account_info.avatar} alt="Profile Pic" className="img-circle dropdown-toggle" data-toggle="dropdown" style={proPicStyle} id="account_info_pic" />
                <ul className="dropdown-menu">
                  <li><Link to="account">Account Info</Link></li>
                  <li><Link to="login">Sign out</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
