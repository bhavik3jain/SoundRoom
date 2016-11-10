import React from 'react';

export default class CreateRoom extends React.Component{
    render() {
        return (
            <div>
                <div className="row">
                    <div class = "col-md-4"></div>
                    <div class = "col-md-4">
                        <div className="panel panel-default panel-joinroom">
                          <div className="panel-body">
                            <h3>Congratulations!</h3>
                            <h5>You have created <b>Room 12</b> with the joining code : <b>1abcdef</b></h5>

                            <button type = "button" className="btn btn-default"><span className="glyphicon glyphicon-share"></span>   Share</button>
                          </div>
                        </div>
                      </div>
                    <div class = "col-md-4"></div>
                </div>
            </div>
        );
    }
}
