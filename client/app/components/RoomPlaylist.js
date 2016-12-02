import React from 'react';
import {getRoomData, getSongsData, getUserDataNCB, saveSongsAsPlayist, getRoomDataServer, addSongToRoom, getSongMetadata, addLikeToSong} from '../server';
import {writeDocument} from '../database';
import SoundCloudPlayer from './SoundCloudPlayer';
import Select from 'react-select';
import eachSeries from 'async/eachSeries';

var each = require('async-each-series');

export default class RoomPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentRoomId: this.props.currentRoomId, playlist: [], track_to_search: ""};
    this.addLikeToSong = this.addLikeToSong.bind(this);

  }

  refresh() {

      getRoomData(this.state.currentRoomId, (roomData) => {
          this.getRoomPlaylistSongs(roomData)
      });
  }

  componentWillMount() {
      this.refresh();
  }

  getRoomPlaylistSongs(roomData) {
      each(roomData.playlist, (song, next) => {
          getSongMetadata(song.trackID).then((songData) => {
              var songMetaData = {};
              songMetaData.likes = song.likes;
              songMetaData.album = "Some Album";
              songMetaData.artist = "Some Artist";
              songMetaData.title = songData.title;
              songMetaData.track_id = songData.id;
              songMetaData.soundcloud_url = songData.uri
              var oldState = this.state;
              oldState.playlist.push(songMetaData);
              this.setState(oldState);
         });
         next();
      });
    //   for(var song in roomData.playlist) {
    //       console.log("Getting metadata for", roomData.playlist[song].trackID);
    //       getSongMetadata(roomData.playlist[song].trackID).then((songData) => {
    //           var songMetaData = {};
    //           console.log(roomData.playlist[song]);
    //           songMetaData.likes = roomData.playlist[song].likes;
    //           songMetaData.album = "Some Album";
    //           songMetaData.artist = "Some Artist";
    //           songMetaData.title = songData.title;
    //           songMetaData.track_id = songData.id;
    //           songMetaData.soundcloud_url = songData.uri
    //           var oldState = this.state;
    //           oldState.playlist.push(songMetaData);
    //           this.setState(oldState);
    //      });
    // }
  }

  getHighestVotedSong(playlist) {
    var max = playlist[0];
    for (var song in playlist) {
      if (playlist[song].likes > max.likes) {
        max = playlist[song];
      }
    }
    return max;
  }

  addLikeToSong(e, song) {
    // var room = getRoomData(this.state.currentRoomId);
    var songTrackId =  this.state.playlist[song].track_id;
    addLikeToSong(this.state.currentRoomId, songTrackId, this.props.userLoggedIn, (roomData) => {
        if('message' in roomData) {
            console.log(roomData['message']);
        }
        else {
            this.setState({currentRoomId: this.props.currentRoomId, playlist: [], "track_to_search": ""});
            console.log("roomData after liked song", roomData);
            this.getRoomPlaylistSongs(roomData);
        }
    });

    // var indexOfUser = room.participants.indexOf(this.pros.userLoggedIn);
    // console.log("indexOfUser,indexOfUser);
    // if (this.state.playlist[song].usersHaveVoted[indexOfUser] != true) {
    //   this.state.playlist[song].usersHaveVoted[indexOfUser] = true
    //   var oldState = this.state;
    //   var modifiedPlayList = this.state.playlist;
    //   modifiedPlayList[song].likes += 1;
    //   oldState.playlist = modifiedPlayList;
    //   oldState.songToPlay = this.getHighestVotedSong(oldState.playlist).soundcloud_url;
    //   console.log("oldState", oldState.songToPlay);
    //   this.setState(oldState);
    // } else {
    //   alert("You have already voted on this song.");
    // }

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
    saveSongsAsPlayist(this.props.userLoggedIn, playlistName, songsId);

  }

  handleSongClick(e, songData) {
    if (e.target && e.target.matches("td.notLike")){
      var oldState = this.state;
      oldState.songToPlay = songData;
      this.setState(oldState);
    }
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
      });
  }

  render() {

    var roomPlaylistSongsElements = [];
    var currentSongToPlay = this.state.playlist[0];
    var N = this.state.playlist.length;
    var playlist_N = Array.apply(null, {length: N}).map(Number.call, Number);
    playlist_N.sort(this.compareVotes.bind(this));
    var roomPlaylistSongsElements = playlist_N.map((song) =>
                                <tr key={song} onClick={(e) => this.handleSongClick(e,this.state.playlist[song].soundcloud_url)}>
                                  <td className="notLike">{this.state.playlist[song].title}</td>
                                  <td className="notLike">{this.state.playlist[song].artist}</td>
                                  <td className="notLike">{this.state.playlist[song].album}</td>
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

        addSongToRoom(this.state.currentRoomId, value.id, this.props.userLoggedIn, (songData) => {

            var new_song = {
                "_id": 13,
                album : "Some Album",
                artist: "Some Artist",
                likes: songData.likes,
                usersHaveVoted: [],
                track_id : value.id,
                soundcloud_url: value.uri,
                title : value.title
            };

            var oldState = this.state;
            oldState.playlist.push(new_song);
            this.setState(oldState);

        });
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
                    <SoundCloudPlayer track_url={this.state.songToPlay} maxHeight={100} autoplay={true}/>
                </div>
                <Select.Async name="search_tracks" value={this.state.track_to_search} onChange={onChange.bind(this)} loadOptions={getOptions} onValueClick={gotoContributor.bind(this)} valueKey="uri" labelKey="title" placeholder="Search Tracks"/>
            </div>
            <div class="col-md-8">

                <table className="table room-playlist">
                <tbody>
                  <tr>
                    <th><h2 className = 'tbHeader'>Song</h2></th>
                    <th><h2 className = 'tbHeader'>Artist</h2></th>
                    <th><h2 className = 'tbHeader'>Album</h2></th>
                    <th><h2 className = 'tbHeader'>Votes</h2></th>
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
