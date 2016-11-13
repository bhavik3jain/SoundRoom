import React from 'react';

export default class Room extends React.Component{
    render() {
        return (
            <div>
            <div>
            <div>
            <div>
                <div className="col-md-9">
                  <div className="playlist">
                    <div className="media">
                      <div className="media-left">
                        <img className="media-object album-cover" src="/img/views_album_cover.jpg" width="150px" alt="Drake - Views" />
                      </div>
                      <div className="media-body music-player">
                        <h3 className="media-heading">Hotline Bling</h3>
                          <h5 className="media-heading">Drake</h5>
                          <br />
                          <audio controls>
                            <source src="horse.ogg" type="audio/ogg" />
                              <source src="horse.mp3" type="audio/mpeg" />
                              </audio>
                            </div>
                          </div>

                          <table className="table">
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
                          </table>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <table className="table">
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
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
