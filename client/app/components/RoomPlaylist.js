import React from 'react';
import {getRoomData, getSongsData, getUserDataNCB, saveSongsAsPlayist} from '../server';
import {writeDocument} from '../database';
import SoundCloudPlayer from './SoundCloudPlayer';

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
    var modifiedPlayList = this.state.playlist;
    modifiedPlayList[song].likes += 1;
    this.setState({currentRoomId: this.state.currentRoomId, playlist: modifiedPlayList});
  }

  compareVotes(a, b) {
    if (this.state.playlist[a].likes < this.state.playlist[b].likes) {
      return 1;
    }
    if (this.state.playlist[a].likes > this.state.playlist[b].likes) {
      return -1;
    }
    return 0;
  }

  savePlaylist() {
    var playlistName = prompt("What do you want to save this playlist as?");
    var playlistsToSave = this.state.playlist;
    var songsId = playlistsToSave.map((item) => item._id)
    saveSongsAsPlayist(this.props.userLoggedIn, playlistName, songsId);
  }

  handleSongClick(songData) {
      console.log("Playing song: ", songData);
      var oldState = this.state;
      oldState.songToPlay = songData;
      this.setState(oldState);
  }

  render() {
    var roomPlaylistSongsElements = [];
    var currentSongToPlay = this.state.playlist[0];
    var N = this.state.playlist.length;
    console.log(this.state.playlist);
    var playlist_N = Array.apply(null, {length: N}).map(Number.call, Number);
    playlist_N.sort(this.compareVotes.bind(this));
    var roomPlaylistSongsElements = playlist_N.map((song) =>
                                <tr key={song} onClick={() => this.handleSongClick(this.state.playlist[song].soundcloud_url)}>
                                  <td><button type="button" className="btn btn-secondary btn-playlist" onClick={(e)=>this.addLikeToSong(e, song)}><span className="glyphicon glyphicon-thumbs-up"></span></button> | {this.state.playlist[song].likes} likes</td>
                                  <td>{this.state.playlist[song].title}</td>
                                  <td>{this.state.playlist[song].artist}</td>
                                  <td>{this.state.playlist[song].album}</td>
                                </tr>);
    var track_url = this.state.songToPlay;

    return (
      <div>
        <div className="media">
            <SoundCloudPlayer track_url={track_url} maxHeight={100}/>
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
