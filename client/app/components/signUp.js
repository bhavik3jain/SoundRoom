import React from 'react';
import {getUserData, getUserInfo, updateProfile} from '../server';

export default class signUp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      account_info: {},
      user_id: this.props.location.query.user_id
    };
  }

  uploadImage(e) {
    e.preventDefault();

    // Read the first file that the user selected (if the user selected multiple
    // files, we ignore the others).
    var reader = new FileReader();
    var file = e.target.files[0];

    // Called once the browser finishes loading the image.
    reader.onload = (upload) => {
      this.setState({
        imageUri: upload.target.result
      });
    };

    // Tell the brower to read the image in as a data URL!
    reader.readAsDataURL(file);
  }

  //change this name to addUserData
  updateUserData() {
    console.log("Creating profile");
    var formData = $('#user-form').serializeArray();
    var firstName = formData[0].value;
    var lastName = formData[1].value;
    var email = formData[2].value;
    var country = formData[3].value;
    var state = formData[4].value;
    var city = formData[5].value;
    var dob = formData[6].value;

    var newUserInfo = {firstName: firstName, lastName: lastName, email: email, country: country, state: state, city: city, dob: dob};

  }

  updateProfile(this.state.user_id, newUserInfo, (userData) => {

    $( '#user-form' ).each(function(){
      this.reset();
    });

    this.refresh();
  });


  uploadImage(e) {
    e.preventDefault();

    // Read the first file that the user selected (if the user selected multiple
    // files, we ignore the others).
    var reader = new FileReader();
    var file = e.target.files[0];

    // Called once the browser finishes loading the image.
    reader.onload = (upload) => {
      this.setState({
        imageUri: upload.target.result
      });
    };

    // Tell the brower to read the image in as a data URL!
    reader.readAsDataURL(file);
  }

  /**
  * Tells the browser to request a file from the user.
  */
  triggerImageUpload(e) {
    e.preventDefault();
    // Click the input HTML element to trigger a file selection dialog.
    this.refs.file.click();
  }

  // refresh() {
  //   this.getAccountData();
  // }

  // getAccountData() {
  //   getUserInfo(this.state.user_id, (accountInfo) => {
  //     this.setState({"account_info": accountInfo});
  //   });
  // }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
      <div className="row" id="main_content">
      <div className="col-md-6">

      <div className="input-group">
      <form action="" method="post" id="user-form">
      <h3>First Name</h3>
      <input name="firstname" id="account-input-box" type="text" className="form-control" placeholder={"Enter first name here"} aria-describedby="basic-addon2" />
      <br />
      <h3>Last Name</h3>
      <input name="lastname" id="account-input-box" type="text" className="form-control" placeholder={"Enter last name here"} aria-describedby="basic-addon2" />
      <br />
      <h3>Email</h3>
      <input name="email" id="account-input-box" type="text" className="form-control" placeholder={"Enter email here"} aria-describedby="basic-addon2" />
      <br />
      <h3>Country</h3>
      <input name="country "id="account-input-box" type="text" className="form-control" placeholder={"Enter country here"} aria-describedby="basic-addon2" />
      <br />
      <h3>State</h3>
      <input name="state" id="account-input-box" type="text" className="form-control" placeholder={"Enter state here"} aria-describedby="basic-addon2" />
      <br />
      <h3>City</h3>
      <input name="city "id="account-input-box" type="text" className="form-control" placeholder={"Enter city here"} aria-describedby="basic-addon2" />
      <br />
      <h3>Date of birth</h3>
      <input name="dob" id="account-input-box" type="text" className="form-control" placeholder={"Enter date of birth here"} aria-describedby="basic-addon2" />
      //must connect it to a function that is to save new user data and not updateUserData
      <button type="button" id="accountinfo-btn1" className="btn btn-primary btn-lg" onClick={(e) => this.updateUserData()}>Sign Up</button>
      </form>
      </div>
      </div>

      <div className="col-md-6">
      <h1 id="account_info_name">{this.state.account_info.firstname + " " + this.state.account_info.lastname}</h1>
      <img src={this.state.account_info.avatar} alt="Profile pic" className="img-circle" id="account_info_pic"/>
      <input ref="file" type="file" name="file" accept=".jpg,.jpeg,.png,.gif" onChange={(e) => this.uploadImage(e)}/>
      <button type="button" id="accountinfo-btn1" className="btn btn-primary btn-lg"  onClick={(e) => this.triggerImageUpload(e)}>Upload Photo</button>

  Post
</button>
      </button>
      </div>
      </div>
      </div>
    );
  }
}
