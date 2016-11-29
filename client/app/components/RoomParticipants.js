import React from 'react';
import {getRoomData, getUserIds} from '../server';

export default class RoomParticipants extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentRoomId: this.props.currentRoomId, participants: {}};
  }

  componentWillMount() {
    this.setState({currentRoomId: this.state.currentRoomId, participants: this.getRoomParticipants(this.state.currentRoomId)});
  }

  getRoomParticipants(roomId) {
    var roomData = getRoomData(parseInt(roomId));
    var pars = [];

    for (var participant in roomData.participants) {
      pars.push(parseInt(roomData.participants[participant]));
    }

    return pars;
  }

  render() {
    var userIds = getUserIds();
    var roomParticipantsNames = [];
    for (var participant in this.state.participants) {
      for (var id in userIds){
        if (userIds[id]._id == this.state.participants[participant]){
          roomParticipantsNames.push(
            <tr>
              <td>{userIds[id].firstname + " " + userIds[id].lastname}</td>
            </tr>
          );
        }
      }
    }

    return (
      <table className="table room-list">
      <tbody>
        <tr>
          <th>Participants</th>
        </tr>
        {roomParticipantsNames}

      </tbody>
      </table>
    );
  }

}
