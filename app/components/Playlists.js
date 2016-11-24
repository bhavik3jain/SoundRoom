import React from 'react';
import {getSongsData} from '../server';
import ReactDOM from 'react-dom';

export default class Playlists extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      soundPlayerIframe: this.props.location.query.setSongToPlay
    };
  }

  handleSongClick(songData) {
      console.log("Playing song: ", songData);
      var oldState = this.state;
      oldState.songToPlay = songData;
      this.setState(oldState)
  }

  getUserPlaylists() {
      getPlaylistData(this.props.user_id, (playlistData) => {
        this.setState({"user_playlists": playlistData});
      });
  }

  // getUserSongsFromPlaylists(playlistData) {
  //   var songData = []
  //   for(var songId in playlistData) {
  //     songData.push(getSongsData(parseInt(playlistData[songId])).title)
  //   }
  //   return songData;
  // }

  // getUserSongArtistsFromPlaylists(playlistData) {
  //   var artists = []
  //   for(var songId in playlistData) {
  //     artists.push(getSongsData(parseInt(playlistData[songId])).artist)
  //   }
  //   return artists;
  // }

  // getUserSongAlbumFromPlaylists(playlistData) {
  //   var artists = []
  //   for(var songId in playlistData) {
  //     artists.push(getSongsData(parseInt(playlistData[songId])).album)
  //   }
  //   return artists;
  // }

  getUserSongInfo(playlistData){
    var data = []
    for(var songId in playlistData) {
      data.push({
                  song_id: getSongsData(parseInt(playlistData[songId]))._id,
                  song_title: getSongsData(parseInt(playlistData[songId])).title,
                  song_artist: getSongsData(parseInt(playlistData[songId])).artist,
                  song_album: getSongsData(parseInt(playlistData[songId])).album
                })
    }
    return data;
  }

  render() {
    //var songData = this.getUserSongsFromPlaylists(playlistData);
    //var artistsData = this.getUserSongArtistsFromPlaylists(playlistData);
    //var albumData = this.getUserSongAlbumFromPlaylists(playlistData);
    var playlistTableData = [];
    var playlistData = this.props.location.query.playlistData;
    var playlistName = this.props.location.query.playlistName;
    var sc_urls = playlistData.map((id) => getSongsData(id).soundcloud_url);
    var data = this.getUserSongInfo(playlistData);
    console.log(data);
    var N = data.length;
    var songlist_N = Array.apply(null, {length: N}).map(Number.call, Number)
    var playlistTableData = songlist_N.map((title) => <tbody key={title}>
                              <tr onClick={() => this.handleSongClick(sc_urls[title])} key={title}>
                                <td>{data[title].song_title}</td>
                                <td>{data[title].song_artist}</td>
                                <td>{data[title].song_album}</td>
                              </tr>
                           </tbody>);

    SC.initialize({
      client_id: '20c77541bd6ca84e8d987789d0bc4b8d'
    });

    var track_url = this.state.songToPlay;

    SC.oEmbed(track_url, {maxheight: 166, show_comments: false, sharing: false, downloadable:false}).then(function(oEmbed) {
        var oldState = this.state;
        oldState.soundPlayerIframe = oEmbed.html
        this.setState(oldState);
    }.bind(this));

    return (
      <div className="saved-playlist">
        <h1>{playlistName}</h1>

        <table>
            <tbody>
              <tr>
                <th> Song Name </th>
                <th> Artist </th>
                <th> Album </th>
              </tr>
            </tbody>

            { playlistTableData }

        </table>

        <br/>

        <div dangerouslySetInnerHTML={{__html: this.state.soundPlayerIframe}} >
        </div>


      </div>


    );
  }
}
