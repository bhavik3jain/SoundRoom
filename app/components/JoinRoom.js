import React from 'react';

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
