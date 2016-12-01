import React from 'react';
import {getUserData, getUserInfo} from '../server';

export default class AccountInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      account_info: {}
    };
  }

  // refresh() {
  //
  // }

  getAccountData() {
    getUserInfo(this.props.user_id, (accountInfo) => {
      this.setState({"account_info": accountInfo});
    });
  }

  componentDidMount() {
    this.getAccountData();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div className="row" id="main_content">
          <div className="col-md-6">

            <div className="input-group">
              <form action="" method="post">
              <h3>First Name</h3>
              <input name="firstname" id="account-input-box" type="text" className="form-control" placeholder={this.state.account_info.firstname} aria-describedby="basic-addon2" />
              <br />
              <h3>Last Name</h3>
              <input name="lastname" id="account-input-box" type="text" className="form-control" placeholder={this.state.account_info.lastname} aria-describedby="basic-addon2" />
              <br />
              <h3>Email</h3>
              <input name="email" id="account-input-box" type="text" className="form-control" placeholder={this.state.account_info.email} aria-describedby="basic-addon2" />
              <br />
              <h3>Date of birth</h3>
              <input name="dob" id="account-input-box" type="text" className="form-control" placeholder={this.state.account_info.dob} aria-describedby="basic-addon2" />
              <br />
              <h3>Country</h3>
              <input name="country "id="account-input-box" type="text" className="form-control" placeholder={this.state.account_info.country} aria-describedby="basic-addon2" />
              <button type="button" id="accountinfo-btn1" className="btn btn-primary btn-lg">Update Profile</button>
              </form>
            </div>
            <button type="button" id="accountinfo-btn2" className="btn btn-success btn-lg">Change Password</button>
          </div>


          <div className="col-md-6">
            <h1 id="account_info_name">{this.state.account_info.firstname + " " + this.state.account_info.lastname}</h1>
            <img src={this.state.account_info.avatar} alt="Profile pic" className="img-circle" id="account_info_pic"/>
          </div>
        </div>

      </div>
    );
  }
}
