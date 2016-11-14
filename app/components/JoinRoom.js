import React from 'react';
import {getRoomIds} from '../server';
import {Link} from 'react-router';

var roomNumber;

// TODO:
// 1) Needs to create a Rooms Table for a database of all active room
// 2) Check to see if the room number is actually active and if its not then throw some error
// 3) Also check with Justin to make the design better for this webpage
// 4) After successful validation of the room number, take the user into the room session (Room Component)

export default class JoinRoom extends React.Component{

  constructor(props){
    super(props);

  }

  validateRoom(e){

    e.preventDefault();
    var rooms = getRoomIds();
    rooms.forEach(function(room){
      if (room._id == document.getElementById("userInput").value){

        roomNumber = room._id;

      }
    });

  }

    render() {
        return (
            <div>
                <div className = "col-md-4"></div>
                 <div className = "col-md-4">
                     <div id="join_room_panel" className="panel panel-default panel-joinroom">
                       <div className="panel-body">
                         <h2 id="join_room_text">Join a Room</h2>
                         <input type="text" className="form-control" id="userInput" onChange={(e)=>this.validateRoom(e)}
                             placeholder="Enter Room Number" />
                           <Link to={{pathname:"room/:roomId",query:{roomId:roomNumber}}}>
                               <button type = "button" className="btn btn-default" id="btn1" >Join</button>
                           </Link>
                           <Link to="/homepage">
                             <button type = "button" className="btn btn-default" id="btn2" >Back</button>
                           </Link>

                        </div>
                     </div>
                   </div>
                 <div className = "col-md-4"></div>
            </div>
        );
    }
}
