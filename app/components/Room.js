import React from 'react';
import {getRoomData, getSongsData} from '../server';

export default class Room extends React.Component{

    constructor(props) {
      super(props);
      this.state = {current_room: ""}
    }

    getRoomPlaylist(roomId) {
      return getRoomData(parseInt(roomId));
    }

    getRoomPlaylistSongs(roomId) {
      var roomData = getRoomData(parseInt(roomId));

      var songs = [];

      // var songs = roomData.playlists.map(function(track) {
      //   return getSongsData(parseInt(roomData.playlists[track]));
      // });

      for (var track in roomData.playlists) {
        songs.push(getSongsData(parseInt(roomData.playlists[track].trackID)));
      }

      // for (var track in roomData.playlists) {
      //   songs.push(getSongsData(parseInt(track.trackID)).title);
      // }
      return songs;
    }

    render() {

        // var roomId = this.props.location.query.roomId;
        // temporarily using test value while JoinRoom is being fixed
        // var roomData = this.getRoomPlaylist(1);
        var roomData = this.getRoomPlaylistSongs(1);
        console.log(roomData);

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
                              <th>Artist</th>
                              <th>Song</th>
                            </tr>
                            <tr className="current-song">
                              <td>Drake</td>
                              <td>Hotline Bling</td>
                            </tr>
                            <tr>
                              <td>Drake</td>
                              <td>Controlla</td>
                            </tr>
                            <tr>
                              <td>DJ Khaled</td>
                              <td>I got the Keys</td>
                            </tr>
                            <tr>
                              <td>The Chainsmokers</td>
                              <td>Closer</td>
                            </tr>
                            <tr>
                              <td>twenty one pilots</td>
                              <td>Heathens</td>
                            </tr>
                            <tr>
                              <td>Kanye West</td>
                              <td>Pt. 2</td>
                            </tr>
                            <tr>
                              <td>Logic</td>
                              <td>Soul Food</td>
                            </tr>
                            <tr>
                              <td>Travis Scott</td>
                              <td>Lose</td>
                            </tr>
                            <tr>
                              <td>Trey Songz</td>
                              <td>2 Reasons (feat T.I.)</td>
                            </tr>
                            <tr>
                              <td>Drake</td>
                              <td>Now & Forever</td>
                            </tr>
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
