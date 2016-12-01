import React from 'react';
import ReactDOM from 'react-dom';
import {readDocument, writeDocument, addDocument,readAllDocuments} from './database.js';
import {startupName} from './database.js';
import {resetDatabase} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */

function emulateServerReturn(data, cb) {
    setTimeout(() => { cb(data); }, 4);
}

export function getUserData(user, cb)  {
    var userData = readDocument('users', user);
    emulateServerReturn(userData, cb);
}

export function getPlaylistData(user, cb) {
  // Get the User object with the id "user".
  var userPlaylists = readDocument('users', user)['playlists'];
  // emulateServerReturn will emulate an asynchronous server operation, which
  // invokes (calls) the "cb" function some time in the future.
  emulateServerReturn(userPlaylists, cb);
}

export function getMakeId(){
    var result = "";
    var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    for (var i = 8; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

export function getSongsData(sc_track, cb) {

    SC.initialize({
        client_id: 'd0cfb4e9bb689b898b7185fbd6d13a57'
    });

    return SC.get(sc_track).then((response) => {
        var title = response.title;
        var album = "Some Album";
        var artist = "Some Artist";
        var soundcloud_url = response.uri;

        var song = {
            "album": album,
            "artist": artist,
            "title": title,
            "soundcloud_url": soundcloud_url
        };

        return song
    });

}

export function getSongsForPlaylist(playlistID, cb) {
    var songsData = readDocument('user', user)['playlists']
}

export function getRoomIds(){

    var roomIds = readAllDocuments("rooms");
    return roomIds;
}

export function getUserIds(){

  var userIds = readAllDocuments("users");
  return userIds;
}

export function getUserDataNCB(user, cb) {
  var userData = readDocument('users', user);
  return userData;
}

export function getRoomData(roomId, cb) {
  var roomData = readDocument('rooms', roomId);
  return roomData;
}



// TODO:
// export function addPlaylistToRoom(roomID, cb) {
//     var roomData = readDocument("room", roomID);
// // }
//
//
export function saveSongsAsPlayist(userId, playlistName, playlistsToSave) {
    var userData = readDocument("users", userId);
    userData.playlists[playlistName] = playlistsToSave;
    writeDocument('users', userData);
}

function sendXHR(verb, resource, body, cb) {
      var xhr = new XMLHttpRequest();
      xhr.open(verb, resource);
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      // Otherwise, ESLint would complain about it! (See what happens in Atom if
      // you remove the comment...)
      /* global FacebookError */
      // Response received from server. It could be a failure, though!
      xhr.addEventListener('load', function() {
        var statusCode = xhr.status;
        var statusText = xhr.statusText;
        if (statusCode >= 200 && statusCode < 300) {
          // Success: Status code is in the [200, 300) range.
          // Call the callback with the final XHR object.
          cb(xhr);
        } else {
          // Client or server error.
          // The server may have included some response text with details concerning
          // the error.
          var responseText = xhr.responseText;
          FacebookError('Could not ' + verb + " " + resource + ": Received " +
          statusCode + " " + statusText + ": " + responseText);
        }
      });
      // Time out the request if it takes longer than 10,000
      // milliseconds (10 seconds)
      xhr.timeout = 10000;
      // Network failure: Could not connect to server.
      xhr.addEventListener('error', function() {
        FacebookError('Could not ' + verb + " " + resource +
        ": Could not connect to the server.");
      });
      // Network failure: request took too long to complete.
      xhr.addEventListener('timeout', function() {
        FacebookError('Could not ' + verb + " " + resource +
        ": Request timed out.");
      });
      switch (typeof(body)) {
        case 'undefined':
        // No body to send.
        xhr.send();
        break;
        case 'string':
        // Tell the server we are sending text.

        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhr.send(body);
        break;
        case 'object':
        // Tell the server we are sending JSON.
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Convert body into a JSON string.
        xhr.send(JSON.stringify(body));
        break;
        default:
        throw new Error('Unknown body type: ' + typeof(body));
      }
}

class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
