import React from 'react';
import RoomPlaylist from './RoomPlaylist';
import RoomParticipants from './RoomParticipants';
import {getMakeId, getRoomData, getSongsData, getUserIds} from '../server';


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
                      <div className="col-md-3">
                        <p>Access Code:</p>{this.state.currentRoomId}
                        <RoomParticipants currentRoomId={this.state.currentRoomId} />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
