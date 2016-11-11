import React from 'react';

// TODO:
// 1) Needs to create a Rooms Table for a database of all active room
// 2) Check to see if the room number is actually active and if its not then throw some error
// 3) Also check with Justin to make the design better for this webpage
// 4) After successful validation of the room number, take the user into the room session (Room Component)


export default class JoinRoom extends React.Component{
    render() {
        return (
            <div>
                <div class = "col-md-4"></div>
                 <div class = "col-md-4">
                     <div id="join_room_panel" className="panel panel-default panel-joinroom">
                       <div className="panel-body">
                         <h3 id="join_room_text">Join a Room</h3>
                         <input type="text" className="form-control"
                             placeholder="Enter Room Number" />
                         <button type = "button" className="btn btn-default">Join</button>
                       </div>
                     </div>
                   </div>
                 <div class = "col-md-4"></div>
            </div>
        );
    }
}
