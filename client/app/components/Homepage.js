import React from 'react';
import {Link, browserHistory} from 'react-router';
import {getMakeId, createRoom} from '../server';

var accessCode = getMakeId();

export default class Navbar extends React.Component{

    createNewRoom(e) {
        createRoom(accessCode, this.props.user_id, (roomId) => {
            if ('message' in roomId) {
                console.log(roomId.message);
            }
            else {
                emitter.emit('updateSidebar'); // Two above listeners invoked
                console.log("creating a new room", accessCode, this.props.user_id);
                browserHistory.push("room/?roomId=" + accessCode + "&user_logged_in=" + this.props.user_id);
            }
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
                        <img src="img/create_room_without_background.png" alt="Create Room" className="img-responsive center-block" style={roomPics} onClick={(e) => this.createNewRoom(e)}/>
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
