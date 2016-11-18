import React from 'react';
import {getRoomData, getSongsData, getUserDataNCB} from '../server';
import {writeDocument} from '../database';

export default class RoomPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentRoomId: this.props.currentRoomId, playlist: {}};
    this.addLikeToSong = this.addLikeToSong.bind(this);
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

  addLikeToSong(e, song) {
    // for (var song in this.state.playlist) {
    //   if (songId == this.state.playlist[song]._id) {
    //     var modifiedPlayList = this.state.playlist;
    //     modifiedPlayList[song].likes += 1;
    //     this.setState({currentRoomId: this.state.currentRoomId, playlist: modifiedPlayList});
    //     break;
    //   }
    // }
    var modifiedPlayList = this.state.playlist;
    modifiedPlayList[song].likes += 1;
    this.setState({currentRoomId: this.state.currentRoomId, playlist: modifiedPlayList});
  }

  savePlaylist() {
    alert("playlist saved!");
  }

  render() {
    var roomPlaylistSongsElements = [];
    var currentSongToPlay = this.state.playlist[0];
    for (var song in this.state.playlist) {
      console.log(this.state.playlist[song]._id);
      roomPlaylistSongsElements.push(
          <tr>
            <td><button type="button" className="btn btn-secondary btn-playlist" onClick={(e)=>this.addLikeToSong(e, song)}><span className="glyphicon glyphicon-thumbs-up"></span></button> | {this.state.playlist[song].likes} likes</td>
            <td>{this.state.playlist[song].title}</td>
            <td>{this.state.playlist[song].artist}</td>
            <td>{this.state.playlist[song].album}</td>
          </tr>
      );
    }

    return (
      <div>
        <div className="media">
          <div className="media-left">
            <img className="media-object album-cover" src="/img/views_album_cover.jpg" width="150px" alt="Drake - Views" />
          </div>
          <div className="media-body">
            {currentSongToPlay.title} <br />
            {currentSongToPlay.artist} - {currentSongToPlay.album}
          </div>
        </div>
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
        <button type="button" className="btn btn-primary" onClick={(e)=>this.savePlaylist(e)}>Save Playlist</button>
      </div>
    );
  }

}
