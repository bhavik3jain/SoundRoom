import React from 'react';
import {getSongsData, getPlaylistData} from '../server';
import ReactDOM from 'react-dom';
import SoundCloudPlayer from './SoundCloudPlayer';

export default class Playlists extends React.Component{
  constructor(props) {
      super(props);
      this.state = {playlist: []};
   }

  handleSongClick(songData) {
      var oldState = this.state;
      oldState.songToPlay = songData;
      this.setState(oldState);
  }

  componentDidMount() {
      var playlistData = this.props.location.query.playlistData;
      console.log(playlistData);
      if(Array.isArray(playlistData)) {
          for(var song in playlistData) {
            console.log("song",playlistData[song]);
              getSongsData(playlistData[song]).then(function(d) {
                  var arrayvar = this.state.playlist.slice();
                  arrayvar.push(d);
                  this.setState({playlist: arrayvar});
              }.bind(this));
          }
      } else {
          getSongsData(playlistData).then(function(d) {
              var arrayvar = this.state.playlist.slice();
              arrayvar.push(d);
              this.setState({playlist: arrayvar});
          }.bind(this));
      }

  }

  componentWillReceiveProps(nextProps) {
      var playlistData = nextProps.location.query.playlistData;
      console.log("updated playlist",playlistData);
      this.setState({playlist: []});
      for(var song in playlistData) {
          getSongsData(playlistData[song]).then(function(d) {
              var arrayvar = this.state.playlist.slice();
              arrayvar.push(d);
              this.setState({playlist: arrayvar});
          }.bind(this));
      }
  }

  componentWillUnmount() {
      console.log("component will unmount");
  }



  render() {
    const playlistArtwork = { width: '50px', height: '50px' };
    var data = this.state.playlist;
    var sc_urls = data.map((song) => song.soundcloud_url);
    var playlistTableData = [];
    var playlistName = this.props.location.query.playlistName;
    var N = data.length;
    var songlist_N = Array.apply(null, {length: N}).map(Number.call, Number)
    var playlistTableData = songlist_N.map((title) => <tbody key={title}>
                              <tr onClick={() => this.handleSongClick(sc_urls[title])} key={title}>
                                <td><img src={data[title].artwork_url} style={playlistArtwork}/></td>
                                <td>{data[title].title}</td>
                              </tr>
                           </tbody>);


    var track_url = this.state.songToPlay;

    return (
        <div>
            <div className="row">
              <div className="col-md-6">
                <div className="saved-playlist">
                    <h1 id="user_playlist_name">{playlistName}</h1>

                  <table className="table-inverse" id="playlist-table">
                      <tbody>
                        <tr>
                          <th width="27%"><h2 className ='tbHeader'></h2></th>
                          <th width="73%"><h2 className = 'tbHeader' > Song Name</h2> </th>
                        </tr>
                      </tbody>
                      { playlistTableData }
                  </table>

                 </div>
              </div>
              <div className="col-md-6">
                 <SoundCloudPlayer track_url={track_url} maxHeight={350} />
              </div>
            </div>

            <br/>
          </div>
    );
  }
}
