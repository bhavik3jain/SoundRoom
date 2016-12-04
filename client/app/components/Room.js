import React from 'react';
import RoomPlaylist from './RoomPlaylist';
import RoomParticipants from './RoomParticipants';
import {getMakeId, getRoomData, getSongsData, getUserIds, removeParticipant} from '../server';
import {Link, browserHistory} from 'react-router';


export default class Room extends React.Component{


    constructor(props) {
      super(props);
      this.state = {
          currentRoomId: this.props.location.query.roomId,
          currentUser: this.props.location.query.user_logged_in
      }
    }

    componentWillMount() {
      this.setState({currentRoomId: this.state.currentRoomId});
    }

    exitRoom(e) {
      var roomId = this.state.currentRoomId;
      var userId = this.state.currentUser;
      removeParticipant(userId, roomId, () => {
        browserHistory.push("/");
      });
    }

    render() {
        console.log(this.props.location.query);
        return (
            <div>
            <div>
            <div>
            <div>
                <div className="col-md-9">
                  <div>
                    <RoomPlaylist currentRoomId={this.state.currentRoomId} userLoggedIn={this.state.currentUser}/>
                    </div>
                      </div>
                      <div id='access-code' className="col-md-3">
                        <center><h3> ACCESS CODE:</h3><h3 className = 'code'>{this.state.currentRoomId}</h3></center>
                        <RoomParticipants currentRoomId={this.state.currentRoomId} />
                        <button type = "button" className="btn btn-default" id="btn1" onClick={(e)=>this.exitRoom(e)}>Exit Room</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
