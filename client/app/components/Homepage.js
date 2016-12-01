import React from 'react';
import {Link, browserHistory} from 'react-router';
import {getMakeId, createRoom} from '../server';

var accessCode = getMakeId();

export default class Navbar extends React.Component{
  //
  // createNewRoom(e){
  //   //this.createRoom();
  //   console.log("here");
  //   console.log(accessCode);
  // }

  createNewRoom() {
        createRoom(accessCode, this.props.user_id, (roomId) => {
          console.log(roomId);
          this.setState(roomId);
        });
  }

    render() {

        const roomPics = {
          width: '130%',
          height: '145%'
        };

        return (
            <div>
                <div id="home_content">
                  <div className="col-lg-6 left_button">
                    <Link to={{pathname:'room',query:{roomId:accessCode}}}>
                      <img src="img/create_room_without_background.png" alt="Create Room" className="img-responsive center-block" style={roomPics} />
                    </Link>
                    <button type = "button" className="btn btn-default" id="btn1" onClick={(e)=>this.createNewRoom(e)}>Create</button>
                  </div>
                  <div className="col-lg-6 right_button">
                    <Link to={{pathname: "joinroom", query: {user_logged_in: this.props.user_id}}}>
                      <img src="img/join_room_without_background.png" alt="Join Room" className="img-responsive center-block"  style={roomPics} />
                    </Link>
                  </div>
                </div>
            </div>
        );
    }
}
