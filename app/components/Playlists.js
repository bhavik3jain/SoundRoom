import React from 'react';

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

  render() {
    var playlistData = this.props.location.query.playlistData;
    console.log(playlistData);
    var playlistTableData = [];

    for (var playlist in playlistData) {
      var songName = playlistData[playlist];
      playlistTableData.push(<tbody><tr><td>{songName}</td></tr></tbody>);
    }
    return (
      <div className="saved-playlist">
        <h1>Playlist</h1>

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
