import React from 'react';
import {getRoomData, getSongsData, getUserDataNCB, saveSongsAsPlayist} from '../server';
import {writeDocument} from '../database';
import SoundCloudPlayer from './SoundCloudPlayer';
import Select from 'react-select';

export default class RoomPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentRoomId: this.props.currentRoomId, playlist: {}, track_to_search: ""};
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
    var songsId = playlistsToSave.map((item) => item.track_id)
    console.log(songsId);
    saveSongsAsPlayist(this.props.userLoggedIn, playlistName, songsId);

  }

  handleSongClick(songData) {
      console.log("Playing song: ", songData);
      var oldState = this.state;
      oldState.songToPlay = songData;
      this.setState(oldState);
  }

  onSearch(value) {
      this.setState({
        value: value,
    });
  }

  printSong(value) {
      SC.initialize({
          client_id: 'd0cfb4e9bb689b898b7185fbd6d13a57'
      });

      var page_size = 100;
      var tracks = SC.get('/tracks', {
          q: value,limit:page_size
      }).then(function(tracks) {
          console.log(tracks);
      });
  }

  render() {
    var roomPlaylistSongsElements = [];
    var currentSongToPlay = this.state.playlist[0];
    var N = this.state.playlist.length;
    var playlist_N = Array.apply(null, {length: N}).map(Number.call, Number);
    playlist_N.sort(this.compareVotes.bind(this));
    var roomPlaylistSongsElements = playlist_N.map((song) =>
                                <tr key={song} onClick={() => this.handleSongClick(this.state.playlist[song].soundcloud_url)}>
                                  <td>{this.state.playlist[song].title}</td>
                                  <td>{this.state.playlist[song].artist}</td>
                                  <td>{this.state.playlist[song].album}</td>
                                  <td><button type="button" className="btn btn-secondary btn-playlist" onClick={(e)=>this.addLikeToSong(e, song)}><span className="glyphicon glyphicon-thumbs-up"></span></button> | {this.state.playlist[song].likes} likes</td>
                                </tr>);
    var track_url = this.state.songToPlay;
    SC.initialize({
        client_id: 'd0cfb4e9bb689b898b7185fbd6d13a57'
    });


    var getOptions = function(input, callback) {
        var page_size = 100;
        return SC.get('/tracks', {
            q: input,limit:page_size
        })
        .then((response) => {
            return {options: response}
        });
    };

    var gotoContributor = function(value, event) {
        var new_song = {
        "_id": 13,
        album : "Some Album",
        artist: "Some Artist",
        likes: 0,
        track_id : "tracks/" + value.id,
        soundcloud_url: value.uri,
        title : value.title};

        var oldState = this.state;
        oldState.playlist.push(new_song);
        this.setState(oldState);
    }

    var onChange = function(value) {
		this.setState({
			track_to_search: value,
		});
	}

    return (
      <div>

      <div class="row">
            <div class="col-md-4">
                <div className="media" id="room_sound_player">
                    <SoundCloudPlayer track_url={track_url} maxHeight={100} autoplay={true}/>
                </div>
                <Select.Async name="search_tracks" value={this.state.track_to_search} onChange={onChange.bind(this)} loadOptions={getOptions} onValueClick={gotoContributor.bind(this)} valueKey="uri" labelKey="title" placeholder="Search Tracks"/>
            </div>
            <div class="col-md-8">

                <table className="table room-playlist">
                <tbody>
                  <tr>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Votes</th>
                  </tr>
                  {roomPlaylistSongsElements}
                </tbody>
                </table>
                <center><button type="button" className="btn btn-primary" id='savePlaylistBtn' onClick={(e)=>this.savePlaylist(e)}>Save Playlist</button></center>
            </div>
      </div>

      </div>
    );
  }

}
