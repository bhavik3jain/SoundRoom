import React from 'react';

// TODO:
// 1) Implement the getHashCode method to retrieve a hash code from the server and then display it
// 2) Fix up the css for this webpage, this looks ugly. Please contact Justin for design help
// 3) Next this page should also have a button called "Go to Room" when the user is ready to make the room (something like that)

export default class CreateRoom extends React.Component{

    createHashCode() {
        // gets a unique hash code to make a room session
        // how you make up the hash code is up to the implementor
        var s="";
        for(var j=0;j<9;++j)
        {
          s=s+Math.floor(Math.random()*10);
        }

        return s;
    }

    render() {
        const code = this.getHashCode();
        return (
            <div>
                <div className="row">
                    <div className= "col-md-4"></div>
                    <div className= "col-md-4">
                        <div className="panel panel-default panel-joinroom">
                          <div className="panel-body">
                            <h3>Congratulations!</h3>
                            <h5>You have created <b>a room</b> with the joining code : <b>{code}</b></h5>
                            <button type = "button" className="btn btn-default"><span className="glyphicon glyphicon-share"></span>Share</button>
                          </div>
                        </div>
                      </div>
                    <div className= "col-md-4"></div>
                </div>
            </div>
        );
    }
}
