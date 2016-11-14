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
    }
    return songData;
  }

  render() {

    var playlistTableData = [];
    var playlistData = this.props.location.query.playlistData;
    var playlistName = this.props.location.query.playlistName;
    console.log(playlistName);
    var songData = this.getUserSongsFromPlaylists(playlistData);
    for(var title in songData) {
      playlistTableData.push(<tbody><tr><td>{songData[title]}</td></tr></tbody>);
    }

    return (
      <div className="saved-playlist">
        <h1>{playlistName}</h1>

        <table>
        <tbody>
          <tr>
            <th> Song Name </th>
          </tr>
        </tbody>
          { playlistTableData }
        </table>
      </div>
    );
  }
}
