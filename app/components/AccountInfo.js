import React from 'react';

export default class AccountInfo extends React.Component{
    render() {
        return (
            <div>
            <div className="row" id="main_content">
               <div className="col-md-6">
                 <h1 id="account_info_name">Kanye West</h1>
                 <img src="img/profile_pic.jpg" alt="Profile pic" className="img-circle" id="account_info_pic" />
                 <button type="button" className="btn btn-primary btn-lg" id="update_pic_button">Upload new picture</button>
               </div>
               <div className="col-md-6">
                 <h3>Username</h3>
                 <div className="input-group">
                   <input type="text" className="form-control" placeholder="KanyeWest" aria-describedby="basic-addon2" />
                 </div>
                 <h3>Email</h3>
                 <div className="input-group">
                   <input type="text" className="form-control" placeholder="yeezy@gmail.com" aria-describedby="basic-addon2" />
                 </div>
                 <h3>Date of birth</h3>
                 <div className="input-group">
                   <input type="text" className="form-control" placeholder="06/08/1977" aria-describedby="basic-addon2" />
                 </div>
                 <h3> Country</h3>
                 <div className="input-group" id= "country">
                   <input type="text" className="form-control" placeholder="United States" aria-describedby="basic-addon2" />
                 </div>

                 <button type="button" className="btn btn-primary btn-lg" >Update Profile</button>
                 <button type="button" className="btn btn-success btn-lg">Change Password</button>
               </div>
             </div>

            </div>
        );
    }
}
