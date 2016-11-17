import React from 'react';

export default class Song extends React.Component {

  constructor(props) {
    super(props);
    this.state = {song: this.props.song};
  }

  render() {
    return(
      <tr>
        <td><button type="button" className="btn btn-secondary btn-playlist"><span className="glyphicon glyphicon-thumbs-up"></span></button> | {this.state.song.likes} likes</td>
        <td>{this.state.song.title}</td>
        <td>{this.state.song.artist}</td>
        <td>{this.state.song.album}</td>
      </tr>
    );
  }

}
