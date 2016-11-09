import React from 'react';

export default class Playlists extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <div>
        <h1>Playlist</h1>

        <table>
          <tr>
            <th> Song Name </th>
            <th> Artist </th>
            <th> Album </th>
          </tr>
          <tr>
            <td> Pt. 2</td>
            <td> Kanye West </td>
            <td> The Life of Pablo </td>
          </tr>
          <tr>
            <td> Welcome to Heartbreak (feat. Kid Cudi) </td>
            <td> Kanye West </td>
            <td> 808s & Heartbreak (Exclusive Edition) </td>
          </tr>
          <tr>
            <td> Starboy (feat. Daft Punk) </td>
            <td> The Weeknd  </td>
            <td> Starboy </td>
          </tr>
          <tr>
            <td> Now & Forever </td>
            <td> Drake </td>
            <td> If You're Reading This It's Too Late </td>
          </tr>
          <tr>
            <td> Soul Food </td>
            <td> Logic </td>
            <td> Under Pressure (Deluxe Version) </td>
          </tr>
          <tr>
            <td> Nikki </td>
            <td> Logic </td>
            <td> Under Pressure (Deluxe Version) </td>
          </tr>
          <tr>
            <td> Man Of The Year </td>
            <td> Logic </td>
            <td> Young Sinatra: Welcome to Forever </td>
          </tr>
          <tr>
            <td> lose </td>
            <td> Travis Scott </td>
            <td> Birds in the Trap Sing McKnight </td>
          </tr>
          <tr>
            <td> Break Your Heart (Feat. Ludacris) </td>
            <td> Taio Cruz & Ludacris </td>
            <td> Rokstarr </td>
          </tr>
          <tr>
            <td> 2 Reasons (feat T.I.) </td>
            <td> Trey Songz </td>
            <td> Chapter V (Deluxe Edition) </td>
          </tr>
          <tr>
            <td> Not Nice </td>
            <td> PARTYNEXTDOOR </td>
            <td> PARTYNEXRDOOR 3 (P3) </td>
          </tr>
        </table>
      </div>
    );
  }
}
