import React from 'react';
import {getRoomData, getSongsData} from '../server';

export default class Room extends React.Component{

    constructor(props) {
      super(props);
      this.state = {playlist: {}}
    }

    getRoomPlaylist(roomId) {
      return getRoomData(parseInt(roomId));
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

    render() {

        var roomPlaylistSongs = this.getRoomPlaylistSongs(2);
        var roomPlaylistSongsElements = [];
        for (var song in roomPlaylistSongs) {
          roomPlaylistSongsElements.push(
            <tr>
              <td>{roomPlaylistSongs[song].likes}</td>
              <td>{roomPlaylistSongs[song].title}</td>
              <td>{roomPlaylistSongs[song].artist}</td>
              <td>{roomPlaylistSongs[song].album}</td>
            </tr>
          );
        }

        console.log(roomPlaylistSongs);

        return (
            <div>
            <div>
            <div>
            <div>
                <div className="col-md-8">
                  <div>
                    <div className="media">
                      <div className="media-left">
                        <img className="media-object album-cover" src="/img/views_album_cover.jpg" width="150px" alt="Drake - Views" />
                      </div>
                      <div className="media-body">
                        <h3 className="media-heading">Hotline Bling</h3>
                          <h5 className="media-heading">Drake</h5>
                          <br />
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
                        </div>
                      </div>
                      <div className="col-md-4">
                      <div id="imaginary_container">
                          <div className="input-group stylish-input-group">
                              <input type="text" className="form-control"  placeholder="Search Tracks"></input>
                              <span className="input-group-addon">
                                  <button type="submit">
                                      <span className="glyphicon glyphicon-search"></span>
                                  </button>
                              </span>
                          </div>
                      </div>
                        <table className="table room-list">
                        <tbody>
                          <tr>
                            <th>Participants</th>
                          </tr>
                          <tr>
                            <td>Lynn Samson</td>
                          </tr>
                          <tr>
                            <td>Siddarth Patel</td>
                          </tr>
                          <tr>
                            <td>Justin Martinelli</td>
                          </tr>
                          <tr>
                            <td>Aarsh Patel</td>
                          </tr>
                          <tr>
                            <td>Ronit Arora</td>
                          </tr>
                          <tr>
                            <td>Bhavik Jain</td>
                          </tr>
                        </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
