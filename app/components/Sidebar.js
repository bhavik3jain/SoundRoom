import React from 'react';
import {getPlaylistData} from '../server';
import {Link} from 'react-router';

export default class Sidebar extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
            user_playlists: {}
        };
	}

    getUserPlaylists() {
        getPlaylistData(this.props.user_id, (playlistData) => {
			this.setState({"user_playlists": playlistData});
		});
    }

    componentDidMount() {
		this.getUserPlaylists();
	}

    render(){
        var playlists = []
        var i = 1

        for (var playlist in this.state.user_playlists) {
            playlists.push(<Link to={{pathname: 'playlists', query: {playlistData:this.state.user_playlists[playlist]}}} key={i}>{playlist}</Link>);
            i++;
        }

        return (
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <Link to="/" id="soundroom_title">
                            <img src="img/SR_logo.png" alt="SoundRoom Logo" id="soundroom_logo"/>
                        </Link>
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
