import React from 'react';
import RoomPlaylist from './RoomPlaylist';
import RoomParticipants from './RoomParticipants';
import {getRoomData, getSongsData, getUserIds} from '../server';

export default class Room extends React.Component{

    constructor(props) {
      super(props);
      this.state = {currentRoomId: this.props.location.query.roomId}
    }

    componentWillMount() {
      this.setState({currentRoomId: this.state.currentRoomId});
    }

    render() {
        
        return (
            <div>
            <div>
            <div>
            <div>
                <div className="col-md-9">
                  <div>
                    <div className="media">
                      <div className="media-left">
                        <img className="media-object album-cover" src="/img/views_album_cover.jpg" width="150px" alt="Drake - Views" />
                      </div>
                      <div className="media-body">

                          <br />
                            </div>
                          </div>

                          <RoomPlaylist currentRoomId={this.state.currentRoomId} />
                        </div>
                      </div>
                      <div className="col-md-3">
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
                        <RoomParticipants currentRoomId={this.state.currentRoomId} />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
