import React from 'react';

export default class Sidebar extends React.Component{
    return (
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="home_page.html" id="soundroom_title">
                        <img src="../../build/img/SR_logo.png" alt="SoundRoom Logo" id="soundroom_logo">
                    </a>
                </li>

                <li id ="user_playlists">
                  <h3>Saved Playlists</h3>
                  <a href="playlist_page.html">Playlist1</a>
                  <a href="playlist_page.html">Playlist2</a>
                </li>
            </ul>
        </div>
    );
}
