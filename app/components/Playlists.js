import React from 'react';
import {getSongsData} from '../server';

export default class Playlists extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
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
      console.log("printing playlistdata: " + playlistData[songId]);
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
    var artistsData = this.getUserSongArtistsFromPlaylists(playlistData);
    var albumData = this.getUserSongAlbumFromPlaylists(playlistData);
    console.log(artistsData);
    for(var title in songData) {
      playlistTableData.push(<tbody>
                              <tr>
                                <td>{songData[title]}</td>
                                <td>{artistsData[title]}</td>
                                <td>{albumData[title]}</td>
                              </tr>
                             </tbody>);
    }

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
      </div>
    );
  }
}
