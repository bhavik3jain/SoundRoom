import React from 'react';
import {getRoomIds} from '../server';
import {Link, browserHistory} from 'react-router';

var input_room_number;

// TODO:
// 1) Needs to create a Rooms Table for a database of all active room
// 2) Check to see if the room number is actually active and if its not then throw some error
// 3) Also check with Justin to make the design better for this webpage
// 4) After successful validation of the room number, take the user into the room session (Room Component)

export default class JoinRoom extends React.Component{

  validateRoom(e){
  var rooms = getRoomIds();
  console.log("here");
  for (var room in rooms){
      input_room_number = document.getElementById("userInput").value;
      if (rooms[room]._id == input_room_number){
        input_room_number = rooms[room]._id;
        browserHistory.push("room/?roomId=" + input_room_number + "&user_logged_in=" + this.props.location.query.user_logged_in);
        console.log("Allowing user to join the room " + input_room_number);
      }
    }
  }



  render() {
        return (
            <div>
                <div className = "col-md-4"></div>
                 <div className = "col-md-4">
                     <div id="join_room_panel" className="panel panel-default panel-joinroom">
                       <div className="panel-body">
                         <h2 id="join_room_text">Join Room</h2>
                         <input type="text" className="form-control" id="userInput"
                             placeholder="Enter Access Code" />
                           <center>
                            <button type = "button" className="btn btn-default" id="btn1" onClick={(e)=>this.validateRoom(e)}>Join</button>
                           <Link to="/">
                             <button type = "button" className="btn btn-default" id="btn2" >Back</button>

                           </Link>
                           </center>
                       </div>
                     </div>
                   </div>
                 <div className = "col-md-4"></div>
            </div>
        );
    }
}
