import React from 'react';
import {getPlaylistData, getUserPlaylist, getUserInfo} from '../server';
import {Link} from 'react-router';

export default class Sidebar extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
            user_id: this.props.user_id,
            user_playlists: {}
        };
	}

    refresh() {

        getUserPlaylist(this.state.user_id, (playlistData) => {
		    this.setState({"user_playlists": playlistData, "user_id": this.state.user_id});
		});

        getUserInfo(this.state.user_id, (userData) => {
            console.log(userData);
            this.setState({"userRoomHost": userData.roomHostID});
        });

    }

    componentDidMount() {
        window.emitter.on('updateSidebar', function (args) {
            this.refresh();
        }.bind(this));

		this.refresh();
	}

    render(){
        var playlists = []
        var i = 1
        for (var playlist in this.state.user_playlists) {
            console.log(this.state.user_playlists[playlist]);
            playlists.push(<Link to={{pathname: 'playlists', query: {playlistData:this.state.user_playlists[playlist], playlistName: playlist, setSongToPlay: undefined}}} key={i}>{playlist}</Link>);
            i++;
        }

        var roomHost = "None";
        if(this.state.userRoomHost !== null) {
            roomHost = this.state.userRoomHost;
        }

        return (
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <Link to="/" id="soundroom_title">
                            <img src="img/SR_logo.png" alt="SoundRoom Logo" id="soundroom_logo"/>
                        </Link>
                    </li>

                    <li id="currently_hosting">
                        <h3 > Hosting Room: </h3>
                        <p> {roomHost} </p>

                    </li>

                    <li id ="user_playlists">
                      <h3>Saved Playlists</h3>
                      { playlists }
                    </li>
                </ul>
            </div>
        );
      }
}
