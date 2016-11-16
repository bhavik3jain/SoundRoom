import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component{
  render(){

    const proPicStyle = {
      width: '60%',
      height: '60%',
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
                <img src="/img/profile_pic.jpg" alt="Join Room" className="img-responsive center-block img-circle" style={proPicStyle}/>
               <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i id="user_icon"></i><span className="caret"></span></a>
               <ul className="dropdown-menu">
                 <li><Link to="account">Account Info</Link></li>
                 <li><a href="#">Sign out</a></li>
               </ul>
             </li>
           </ul>
         </div>
         </nav>
        </div>
    );
  }
}
