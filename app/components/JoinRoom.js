import React from 'react';
import {Link} from 'react-router';

// TODO:
// 1) Needs to create a Rooms Table for a database of all active room
// 2) Check to see if the room number is actually active and if its not then throw some error
// 3) Also check with Justin to make the design better for this webpage
// 4) After successful validation of the room number, take the user into the room session (Room Component)


export default class JoinRoom extends React.Component{

  constructor(props){
    super(props);
    this.state = {text:""};
  }





    render() {
        return (
            <div>
                <div class = "col-md-4"></div>
                 <div class = "col-md-4">
                     <div id="join_room_panel" className="panel panel-default panel-joinroom">
                       <div className="panel-body">
                         <h2 id="join_room_text">Join a Room</h2>
                         <input type="text" className="form-control"
                             placeholder="Enter Room Number" />
                         <Link to="/room">
                           <button type = "button" className="btn btn-default">Join</button>

                         </Link>
                       </div>
                     </div>
                   </div>
                 <div class = "col-md-4"></div>
            </div>
        );
    }
}
