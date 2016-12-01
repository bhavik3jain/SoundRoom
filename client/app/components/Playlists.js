import React from 'react';
import {getSongsData, getPlaylistData} from '../server';
import ReactDOM from 'react-dom';
import SoundCloudPlayer from './SoundCloudPlayer';

export default class Playlists extends React.Component{
  constructor(props) {
      super(props);
      this.state = {playlist: []};
    //   #this.setupPlaylist();
   }

  handleSongClick(songData) {
      var oldState = this.state;
      oldState.songToPlay = songData;
      this.setState(oldState);
  }

  // getUserPlaylists() {
  //     getPlaylistData(this.props.user_id, (playlistData) => {
  //       this.setState({"user_playlists": playlistData});
  //     });
  // }


  componentDidMount() {
      var playlistData = this.props.location.query.playlistData;
      for(var song in playlistData) {
          getSongsData(playlistData[song]).then(function(d) {
              var arrayvar = this.state.playlist.slice();
              arrayvar.push(d);
              this.setState({playlist: arrayvar});
          }.bind(this));
      }
  }

  componentWillReceiveProps(nextProps) {
      var playlistData = this.props.location.query.playlistData;
      console.log(playlistData);
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
    //   var playlistData = this.props.location.query.playlistData;
    //   playlistData.map((song) => {
    //       getSongsData(song).then(function(d) {
    //           var arrayvar = this.state.playlist.slice();
    //           arrayvar.push(<tbody key={song}>
    //                             <tr onClick={() => this.handleSongClick(d.soundcloud_url)} key={song}>
    //                               <td>{d.title}</td>
    //                               <td>{d.artist}</td>
    //                               <td>{d.album}</td>
    //                             </tr>
    //                         </tbody>);
    //          this.setState({playlist: arrayvar});
    //       }.bind(this));
    //   });


    var data = this.state.playlist;
    // console.log("Data", data);
    var sc_urls = data.map((song) => song.soundcloud_url);
    var playlistTableData = [];
    var playlistName = this.props.location.query.playlistName;
    var N = data.length;
    var songlist_N = Array.apply(null, {length: N}).map(Number.call, Number)
    var playlistTableData = songlist_N.map((title) => <tbody key={title}>
                              <tr onClick={() => this.handleSongClick(sc_urls[title])} key={title}>
                                <td>{data[title].title}</td>
                                <td>{data[title].artist}</td>
                                <td>{data[title].album}</td>
                              </tr>
                           </tbody>);


    var track_url = this.state.songToPlay;

    return (
        <div>
            <div className="row">
              <div className="col-md-6">
                <div className="saved-playlist">
                    <h1 id="user_playlist_name">{playlistName}</h1>

                  <table className="table-inverse">
                      <tbody>
                        <tr>
                          <th><h2 className = 'tbHeader'> Song Name</h2> </th>
                          <th> <h2 className = 'tbHeader'>Artist </h2> </th>
                          <th><h2 className = 'tbHeader'> Album </h2> </th>
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
