import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component{
    render() {

        const roomPics = {
          width: '130%',
          height: '145%',
        };

        return (
            <div>
                <div id="home_content">
                  <div className="col-lg-6 left_button">
                    <Link to="/createroom">
                      <img src="img/create_room_without_background.png" alt="Create Room" className="img-responsive center-block" style={roomPics} />
                    </Link>
                  </div>
                  <div className="col-lg-6 right_button">
                    <Link to ="/joinroom">
                      <img src="img/join_room_without_background.png" alt="Join Room" className="img-responsive center-block"  style={roomPics} />
                    </Link>
                  </div>
                </div>
            </div>
        );
    }
}
