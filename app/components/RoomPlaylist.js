import React from 'react';
import {getRoomData, getSongsData} from '../server';

export default class RoomPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentRoomId: this.props.currentRoomId, playlist: {}};
  }

  componentWillMount() {
    this.setState({currentRoomId: this.state.currentRoomId, playlist: this.getRoomPlaylistSongs(this.state.currentRoomId)});
  }

  getRoomPlaylistSongs(roomId) {
    var roomData = getRoomData(parseInt(roomId));
    var songs = [];

    for (var track in roomData.playlists) {
      var songData = getSongsData(parseInt(roomData.playlists[track].trackID));
      songData.likes = roomData.playlists[track].likes;
      songs.push(songData);
    }

    return songs;
  }

  render() {
    var roomPlaylistSongsElements = [];
    for (var song in this.state.playlist) {
      roomPlaylistSongsElements.push(
        <tr>
          <td><button type="button" className="btn btn-secondary btn-playlist"><span className="glyphicon glyphicon-thumbs-up"></span></button> | {this.state.playlist[song].likes} likes</td>
          <td>{this.state.playlist[song].title}</td>
          <td>{this.state.playlist[song].artist}</td>
          <td>{this.state.playlist[song].album}</td>
        </tr>
      );
    }

    return (
      <table className="table room-playlist">
      <tbody>
        <tr>
          <th>Votes</th>
          <th>Song</th>
          <th>Artist</th>
          <th>Album</th>
        </tr>
        {roomPlaylistSongsElements}
      </tbody>
      </table>
    );
  }

}
