import React from 'react';
import {getUserData} from '../server';

export default class AccountInfo extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
            account_info: {}
        };
	}

    getAccountData() {
        getUserData(this.props.user_id, (accountInfo) => {
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
                 <h1 id="account_info_name">{this.state.account_info.firstname + " " + this.state.account_info.lastname}</h1>
                 <img src={this.state.account_info.avatar} alt="Profile pic" className="img-circle" id="account_info_pic" />
                 <button type="button" className="btn btn-primary btn-lg" id="update_pic_button">Upload new picture</button>
               </div>
               <div className="col-md-6">
                 <div className="input-group">
                   <input type="text" className="form-control" placeholder={this.state.account_info.firstname + " " + this.state.account_info.lastname} aria-describedby="basic-addon2" />
                 </div>
                 <br />
                 <div className="input-group">
                   <input type="text" className="form-control" placeholder={this.state.account_info.email} aria-describedby="basic-addon2" />
                 </div>
                 <br />
                 <div className="input-group">
                   <input type="text" className="form-control" placeholder={this.state.account_info.dob} aria-describedby="basic-addon2" />
                 </div>
                 <br />
                 <div className="input-group" id= "country">
                   <input type="text" className="form-control" placeholder={this.state.account_info.country} aria-describedby="basic-addon2" />
                 </div>

                 <button type="button" className="btn btn-primary btn-lg" >Update Profile</button>
                 <button type="button" className="btn btn-success btn-lg">Change Password</button>
               </div>
             </div>

            </div>
        );
    }
}
