import React from 'react';
import RoomPlaylist from './RoomPlaylist';
import RoomParticipants from './RoomParticipants';
import {getMakeId, getRoomData, getSongsData, getUserIds, removeParticipant, getRoomHost, deleteRoom, textAccessCode} from '../server';
import {Link, browserHistory} from 'react-router';
import ReactDOM from 'react-dom';



export default class Room extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
          currentRoomId: this.props.location.query.roomId,
          currentUser: this.props.location.query.user_logged_in
      }

      var socket = io();
      socket.on("delete room", (data) => {
          bootbox.alert({
              message: data.message,
              backdrop: true,
              className: 'soundroom_error_modal'
          });

          browserHistory.push('/');
          emitter.emit('updateSidebar'); // Two above listeners invoke
      });
    }

    shouldHideExitButton() {
        getRoomHost(this.state.currentRoomId, (result) => {
          if (result.host === this.state.currentUser){
            return 'hidden';

          } else {
            return '';
          }
        });
      }



    componentWillMount() {
        getRoomHost(this.state.currentRoomId, (result) => {
            this.setState({currentRoomId: this.state.currentRoomId, hostId: result.host});
        });
    }

    closeRoom(e) {
      getRoomHost(this.state.currentRoomId, (result) => {
        if (result.host === this.state.currentUser) {
          console.log("you are the host");
          deleteRoom(this.state.currentRoomId, (deleted) => {});
          emitter.emit('updateSidebar'); // Two above listeners invoke
        } else {
            bootbox.alert({
                message: "You cannot close the room because you aren't the host",
                backdrop: true,
                className: 'soundroom_error_modal'
            });
        }
      });
    }

    shareAccessCode(e) {
      e.preventDefault();
      var phonenumber = $("#phone_number_to_share").val();
      textAccessCode(this.state.currentRoomId, phonenumber, (response) => {
        if(response.success) {
          console.log(response.message);
          $("#close_modal").click();
        }
      });
    }



    render() {

      var shouldHideCloseButton = function(value){
          if (this.state.hostId === this.state.currentUser){
            value = '';
          } else {
            value = 'hidden';
          }
          return value;
      }.bind(this);

        return (
            <div>
            <div>
            <div>
            <div>
                <div className="col-md-9">
                  <div>
                    <RoomPlaylist currentRoomId={this.state.currentRoomId} userLoggedIn={this.state.currentUser} />
                    </div>
                      </div>
                      <div id='access-code' className="col-md-3">
                        <center><h3><strong>ACCESS CODE:</strong></h3><h3 className = 'code'>{this.state.currentRoomId}

                        <button id="share-button" type="button" className="btn btn-xs btn-primary" data-toggle="modal" data-target="#myModal">
                          <span className="glyphicon glyphicon-share" aria-hidden="true"></span>
                        </button>
                        </h3>

                        </center>
                        <center><button type="button" className={"btn btn-sm " + shouldHideCloseButton('')} id='exit-room' onClick={(e)=>this.closeRoom(e)}>Close Room</button></center><br />
                        <RoomParticipants currentRoomId={this.state.currentRoomId} currentUser={this.state.currentUser} hostId={this.state.hostId}/>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-body">
                      <p><a title="Facebook" href=""><span className="fa-stack fa-lg"><i className="fa fa-square-o fa-stack-2x"></i><i className="fa fa-facebook fa-stack-1x"></i></span></a> <a title="Twitter" href=""><span className="fa-stack fa-lg"><i className="fa fa-square-o fa-stack-2x"></i><i className="fa fa-twitter fa-stack-1x"></i></span></a> <a title="Google+" href=""><span className="fa-stack fa-lg"><i className="fa fa-square-o fa-stack-2x"></i><i className="fa fa-google-plus fa-stack-1x"></i></span></a> <a title="Linkedin" href=""><span className="fa-stack fa-lg"><i className="fa fa-square-o fa-stack-2x"></i><i className="fa fa-linkedin fa-stack-1x"></i></span></a> <a title="Reddit" href=""><span className="fa-stack fa-lg"><i className="fa fa-square-o fa-stack-2x"></i><i className="fa fa-reddit fa-stack-1x"></i></span></a> <a title="WordPress" href=""><span className="fa-stack fa-lg"><i className="fa fa-square-o fa-stack-2x"></i><i className="fa fa-wordpress fa-stack-1x"></i></span></a> <a title="Digg" href=""><span className="fa-stack fa-lg"><i className="fa fa-square-o fa-stack-2x"></i><i className="fa fa-digg fa-stack-1x"></i></span></a>  <a title="Stumbleupon" href=""><span className="fa-stack fa-lg"><i className="fa fa-square-o fa-stack-2x"></i><i className="fa fa-stumbleupon fa-stack-1x"></i></span></a><a title="E-mail" href=""><span className="fa-stack fa-lg"><i className="fa fa-square-o fa-stack-2x"></i><i className="fa fa-envelope fa-stack-1x"></i></span></a>  <a title="Print" href=""><span className="fa-stack fa-lg"><i className="fa fa-square-o fa-stack-2x"></i><i className="fa fa-print fa-stack-1x"></i></span></a></p>

                      <h2><i className="fa fa-envelope"></i> Share Access Code - {this.state.currentRoomId}</h2>

                              <form action="" method="post">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <span className="glyphicon glyphicon-earphone" aria-hidden="true"></span>
                                    </span>
                                    <input type="text" id="phone_number_to_share" className="form-control" placeholder="xxxxxxxxxx" aria-describedby="basic-addon1" />
                                </div>
                                  <br />
                                  <button type="button" value="sub" name="sub" className="btn btn-default" onClick={(e) => this.shareAccessCode(e)}><i className="fa fa-share"></i> Share!</button>
                            </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" id="close_modal" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
