import React from 'react';

export default class Navbar extends React.Component{
    return (
        <nav class="navbar navbar-light bg-faded" id="home_page_navbar">
          <div class="col-lg-3"></div>
          <div class="col-lg-6" id="title">
               <h3>Welcome to</h3>
               <h1>SoundRoom</h1>
           </div>
           <div class="col-lg-2"></div>
             <div class="col-lg-1">
             <ul class="nav navbar-nav">
             <li class="dropdown top-dropdown">
                 <img src="../../build/img/profile_pic.jpg" alt="Join Room" class="img-responsive center-block img-circle" style="width:60%;height:60%;">
               <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i id="user_icon"></i><span class="caret"></span></a>
               <ul class="dropdown-menu">
                 <li><a href="/account_info.html">Account Info</a></li>
                 <li><a href="#">Sign out</a></li>
               </ul>
             </li>
           </ul>
         </div>
         </nav>
    );
}
