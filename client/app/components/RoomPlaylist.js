import React from 'react';
import {getRoomData, getSongsData, getUserDataNCB, saveSongsAsPlayist, getRoomDataServer, addSongToRoom, getSongMetadata, addLikeToSong} from '../server';
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
              console.log(songData);
              var songMetaData = {};
              songMetaData.likes = song.likes;
              songMetaData.album = "Some Album";
              songMetaData.artist = "Some Artist";
              songMetaData.title = songData.title;
              songMetaData.track_id = songData.id;
              songMetaData.soundcloud_url = songData.uri;
              songMetaData.artwork_url = songData.artwork_url;
              var oldState = this.state;
              oldState.playlist.push(songMetaData);
              this.setState(oldState);
         });
         next();
      });
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
    saveSongsAsPlayist(this.props.userLoggedIn, this.state.currentRoomId, playlistName, (userInfo) => {
        if('message' in userInfo) {
            console.log(userInfo['message']);
        }
         else {
            console.log(userInfo);
        }
    });
 }

  handleSongClick(e, songData) {
    if (e.target && e.target.matches("td.notLike")){
      var oldState = this.state;
      oldState.songToPlay = songData;
      this.setState(oldState);
    }
  }

  render() {

    const roomPlaylistArtwork = { width: '50px', height: '50px' };


    var roomPlaylistSongsElements = [];
    var currentSongToPlay = this.state.playlist[0];
    var N = this.state.playlist.length;
    var playlist_N = Array.apply(null, {length: N}).map(Number.call, Number);
    playlist_N.sort(this.compareVotes.bind(this));
    var roomPlaylistSongsElements = playlist_N.map((song) =>
                                <tr key={song} onClick={(e) => this.handleSongClick(e,this.state.playlist[song].soundcloud_url)}>
                                  <td className="notLike"><img src={this.state.playlist[song].artwork_url} style={roomPlaylistArtwork}/></td>
                                  <td className="notLike">{this.state.playlist[song].title}</td>
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
            console.log(value);
            var artwork_url = ""
            if(value.artwork_url === null) {
                artwork_url = "https://screenshots.en.sftcdn.net/en/scrn/6649000/6649766/soundcloud-555ac7e90a986-100x100.png";
            }
            else {
                artwork_url = value.artwork_url;
            }

            var new_song = {
                "_id": 13,
                album : "Some Album",
                artist: "Some Artist",
                likes: songData.likes,
                usersHaveVoted: [],
                track_id : value.id,
                soundcloud_url: value.uri,
                artwork_url: artwork_url,
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

                <table className="table-inverse room-playlist">
                <tbody>
                  <tr>
                    <th><h2 className = 'tbHeader'>Artwork</h2></th>
                    <th><h2 className = 'tbHeader'>Song</h2></th>
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
