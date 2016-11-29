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

  getUserSongsFromPlaylists(playlistData) {
    var songData = []
    for(var songId in playlistData) {
      songData.push(getSongsData(parseInt(playlistData[songId])).title)
    }
    return songData;
  }

  getUserSongArtistsFromPlaylists(playlistData) {
    var artists = []
    for(var songId in playlistData) {
      artists.push(getSongsData(parseInt(playlistData[songId])).artist)
    }
    return artists;
  }

  getUserSongAlbumFromPlaylists(playlistData) {
    var artists = []
    for(var songId in playlistData) {
      artists.push(getSongsData(parseInt(playlistData[songId])).album)
    }
    return artists;
  }

  render() {
    var playlistTableData = [];
    var playlistData = this.props.location.query.playlistData;
    var playlistName = this.props.location.query.playlistName;
    var songData = this.getUserSongsFromPlaylists(playlistData);
    var sc_urls = playlistData.map((id) => getSongsData(id).soundcloud_url);
    var artistsData = this.getUserSongArtistsFromPlaylists(playlistData);
    var albumData = this.getUserSongAlbumFromPlaylists(playlistData);
    var N = songData.length;
    var songlist_N = Array.apply(null, {length: N}).map(Number.call, Number)
    var playlistTableData = songlist_N.map((title) => <tbody key={title}>
                              <tr onClick={() => this.handleSongClick(sc_urls[title])} key={title}>
                                <td>{songData[title]}</td>
                                <td>{artistsData[title]}</td>
                                <td>{albumData[title]}</td>
                              </tr>
                           </tbody>);

    SC.initialize({
      client_id: '20c77541bd6ca84e8d987789d0bc4b8d'
    });

    var track_url = this.state.songToPlay;

    SC.oEmbed(track_url, {maxheight: 350, show_comments: false, sharing: false, downloadable:false}).then(function(oEmbed) {
        var oldState = this.state;
        oldState.soundPlayerIframe = oEmbed.html
        this.setState(oldState);
    }.bind(this));

    return (
        <div>
            <div className="row">
              <div className="col-md-6">
                <div className="saved-playlist">
                    <h1 id="user_playlist_name">{playlistName}</h1>

                  <table className="table-inverse">
                      <tbody>
                        <tr>
                          <th> Song Name </th>
                          <th> Artist </th>
                          <th> Album </th>
                        </tr>
                      </tbody>

                      { playlistTableData }

                  </table>
                 </div>
              </div>
              <div className="col-md-6">
                  <div dangerouslySetInnerHTML={{__html: this.state.soundPlayerIframe}} >
                  </div>
              </div>
            </div>

            <br/>



          </div>
    );
  }
}
