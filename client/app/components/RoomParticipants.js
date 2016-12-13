import React from 'react';
import {getRoomParticipants, removeParticipant, getRoomData, getUserInfo, getRoomHost} from '../server';
import {Link, browserHistory} from 'react-router';




export default class RoomParticipants extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentRoomId: this.props.currentRoomId, currentUser: this.props.currentUser, participants: {}};

    var socket = io();

    socket.on("joinroom", function(data) {
        // this.setState({});
        console.log("Getting roomId of: ", this.state.currentRoomId);
        getRoomParticipants(this.state.currentRoomId, (roomParticipants) => {
        this.setState({currentRoomId: this.state.currentRoomId, currentUser: this.state.currentUser, participants: roomParticipants.participants})
        });
    }.bind(this));

    socket.on("remove participant", function(data) {
        /// error here: it trys to post afte
        // this.setState({});
        getRoomParticipants(this.state.currentRoomId, (roomParticipants) => {
            this.setState({currentRoomId: this.state.currentRoomId, currentUser: this.state.currentUser, participants: roomParticipants.participants})
        });
    }.bind(this));

  }

  exitRoom(e) {
    var roomId = this.state.currentRoomId;
    var userId = this.state.currentUser;
    removeParticipant(userId, roomId, (data) => {
      console.log("removing participant", userId);
      browserHistory.push('/?user_id=' + this.state.currentUser);
      window.location.reload();
    });
  }


  componentWillMount() {

      getRoomParticipants(this.state.currentRoomId, (roomParticipants) => {
          this.setState({currentRoomId: this.state.currentRoomId, currentUser: this.state.currentUser, participants: roomParticipants.participants})
      });


  }

  componentWillReceiveProps(nextProps) {
      getUserInfo(nextProps.hostId, (user) => {
          this.setState({hostFullName: user.firstname + " " + user.lastname});
      });
  }


  render() {
    var roomParticipantsNames = this.state.participants;
    var roomParticipantsRows = [];
    for (var participant in roomParticipantsNames) {
        if(roomParticipantsNames[participant] === this.state.hostFullName) {
            roomParticipantsRows.push(
              <tr key={participant}>
                <td><span className="glyphicon glyphicon-star room-participants-icon" aria-hidden="true"></span>{roomParticipantsNames[participant]}</td>
              </tr>
            );
        } else {
          roomParticipantsRows.push(
            <tr key={participant}>
              <td><span className="glyphicon glyphicon-user room-participants-icon" aria-hidden="true"></span> {roomParticipantsNames[participant]} </td>
            </tr>
          );
      }
    }


    var shouldHideExitButton = function(value){
        console.log(this.props.hostId === this.state.currentUser);
        if (this.props.hostId === this.state.currentUser){
          value = 'hidden';
        } else {
          value = '';
        }
        return value;
    }.bind(this);


    return (
  <div>
          <table className="table room-list">
          <tbody>
            <tr>
              <th><h2 className = 'tbHeader'><strong>Participants</strong></h2></th>
            </tr>

            {roomParticipantsRows}

          </tbody>
          </table>

          <button type = "button" className={"btn btn-default " + shouldHideExitButton('')} id="exit-room" onClick={(e)=>this.exitRoom(e)}>Exit Room</button>
      </div>

    );
  }

}
