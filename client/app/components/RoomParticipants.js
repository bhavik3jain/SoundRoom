import React from 'react';
import {getRoomParticipants} from '../server';

export default class RoomParticipants extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentRoomId: this.props.currentRoomId, participants: {}};
  }


  componentWillMount() {


      getRoomParticipants(this.state.currentRoomId, (roomParticipants) => {
          this.setState({currentRoomId: this.state.currentRoomId, participants: roomParticipants.participants})
      });

    // this.setState({currentRoomId: this.state.currentRoomId, participants: this.getRoomParticipants(this.state.currentRoomId)});
  }

  render() {
    // var userIds = getUserIds();
    var roomParticipantsNames = this.state.participants;
    var roomParticipantsRows = [];
    for (var participant in roomParticipantsNames) {
          roomParticipantsRows.push(
            <tr key={participant}>
              <td>{roomParticipantsNames[participant]}</td>
            </tr>
          );
    }

    return (
      <table className="table room-list">
      <tbody>
        <tr>
          <th><h2 className = 'tbHeader'>Participants</h2></th>
        </tr>

        {roomParticipantsRows}

      </tbody>
      </table>
    );
  }

}
