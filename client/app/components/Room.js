import React from 'react';
import RoomPlaylist from './RoomPlaylist';
import RoomParticipants from './RoomParticipants';
import {getMakeId, getRoomData, getSongsData, getUserIds, removeParticipant, getRoomHost, deleteRoom} from '../server';
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
        getRoomHost(this.state.currentRoomId, (result) => {
            this.setState({currentRoomId: this.state.currentRoomId, hostId: result.host});
        });
    }

    closeRoom(e) {
      getRoomHost(this.state.currentRoomId, (result) => {
        if (result.host === this.state.currentUser) {
          console.log("you are the host");
          deleteRoom(this.state.currentRoomId, (deleted) => {});
          browserHistory.push('/');
          emitter.emit('updateSidebar'); // Two above listeners invoke
        } else {
          console.log("you are not the host");
          alert("you are not the host");
        }
      });
    }

    // exitRoom(e) {
    //   var roomId = this.state.currentRoomId;
    //   var userId = this.state.currentUser;
    //   removeParticipant(userId, roomId, (data) => {
    //     console.log("removing participant", userId);
    //     browserHistory.push('/');
    //   });
    // }

    render() {
        return (
            <div>
            <div>
            <div>
            <div>
                <div className="col-md-9">
                  <div>
                    <RoomPlaylist currentRoomId={this.state.currentRoomId} userLoggedIn={this.state.currentUser} />
                    </div>
                      </div>
                      <div id='access-code' className="col-md-3">
                        <center><h3> ACCESS CODE:</h3><h3 className = 'code'>{this.state.currentRoomId}</h3></center>
                        <center><button type="button" className="btn btn-sm" id='exit-room' onClick={(e)=>this.closeRoom(e)}>Close Room</button></center><br />
                        <RoomParticipants currentRoomId={this.state.currentRoomId} currentUser={this.state.currentUser} hostId={this.state.hostId}/>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
