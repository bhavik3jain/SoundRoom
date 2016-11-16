import React from 'react';
import {getRoomIds} from '../server';
import {Link} from 'react-router';
// TODO:
// 1) Implement the getHashCode method to retrieve a hash code from the server and then display it
// 2) Fix up the css for this webpage, this looks ugly. Please contact Justin for design help
// 3) Next this page should also have a button called "Go to Room" when the user is ready to make the room (something like that)

export default class CreateRoom extends React.Component{

    getHashCode() {
        // gets a unique hash code to make a room session
        // how you make up the hash code is up to the implementor
        var result = '';
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 8; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    render() {
        const code = this.getHashCode();
        console.log(code);
        return (
            <div>
                <div className="row">
                    <div className= "col-md-4"></div>
                    <div className= "col-md-4">
                        <div className="panel panel-default panel-joinroom">
                          <div className="panel-body">
                        <Link to={{pathname:"emptyroom",query:{roomId:10}}}>

                            <button type = "button" className="btn btn-default">Create a Room!</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    <div className= "col-md-4"></div>
                </div>
            </div>
        );
    }
}
