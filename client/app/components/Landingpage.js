import React from 'react';
import {Link, browserHistory} from 'react-router';

export default class Landingpage extends React.Component{
  render(){
    return(
      <div id="landing-body" data-spy="scroll" data-target=".navbar" data-offset="100">

          //navbar

          <nav className="navbar navbar-light bg-faded navbar-fixed-top">
            <div className="col-lg-3">
            </div>
            <div className="col-lg-6"></div>
            <div className="col-lg-3">
              <center>
                <button type = "button" className="btn btn-default" id="log-in"> Log In</button>
                <button type = "button" className="btn btn-default" id="sign-up"> Sign Up</button>
              </center>
            </div>
          </nav>
          //navbar


          //home page top
          <div id="home_page_navbar_landing" className="jumbotron jumbotron-fluid">
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6" id="title_home">
                <center>
                  <h3>Welcome to</h3>
                  <h1>SoundRoom</h1>
                </center>
              </div>
              <div className="col-lg-3"></div>
            </div>
            <div className="row">
              <div className="col-lg-5"></div>
              <div className="col-lg-2">
                <img src="\img\SR_logo.png" alt="SoundRoom Logo" id="soundroom_logo" />
              </div>
              <div className="col-lg-5"></div>
            </div>
            <div className="row">
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                <h2 id="subheading">CREATE COLLABORATIVE PLAYLISTS WITH YOUR FRIENDS</h2>
              </div>
              <div className="col-lg-3"></div>
            </div>
        </div>
          // home page top

            // How it works -->
            <div id="how_it_works" className="how_it_works">

                <div className="row">
                  <div className="col-lg-12"><center>
                  <h3 >HOW IT WORKS</h3>
        <img id="explanation" src="img/hiw.png" alt="how it works" />
        </center>
                  </div>


                </div>

            </div>
            //how it works -->



            // footer -->
            <div className="footer">
              <div className="col-lg-4 text-xs-center"></div>
              <div className="col-lg-4 text-xs-center">
                <center>
                <p>&copy; 2016 SoundRoom.</p>
              </center>
              </div>
              <div className="col-lg-4 text-xs-center"></div>
            </div>
             // footer -->
      </div>
    );
  }
}
