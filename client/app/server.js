import React from 'react';
import ReactDOM from 'react-dom';
var token = 'eyJpZCI6MX0=';

function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global SoundRoomError */
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
        console.log("Error", responseText);
        SoundRoomError(responseText);
      }
    });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  //Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    SoundRoomError('Could not ' + verb + " " + resource +
    ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    SoundRoomError('Could not ' + verb + " " + resource +
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
        var artwork_url = "";
        if(response.artwork_url === null) {
            artwork_url = "https://screenshots.en.sftcdn.net/en/scrn/6649000/6649766/soundcloud-555ac7e90a986-100x100.png"
        } else {
            artwork_url = response.artwork_url;
        }


        var song = {
            "album": album,
            "artist": artist,
            "title": title,
            "soundcloud_url": soundcloud_url,
            "artwork_url": artwork_url
        };

        return song
    });

}


export function getSongMetadata(songId) {
    SC.initialize({
        client_id: 'd0cfb4e9bb689b898b7185fbd6d13a57'
    });

    return SC.get("tracks/" + songId);
}

// var token = "eyJpZCI6MX0=";
//
// function sendXHR(verb, resource, body, cb) {
//       var xhr = new XMLHttpRequest();
//       xhr.open(verb, resource);
//       xhr.setRequestHeader('Authorization', 'Bearer ' + token);
//       // Otherwise, ESLint would complain about it! (See what happens in Atom if
//       // you remove the comment...)
//       /* global SoundRoomError */
//       // Response received from server. It could be a failure, though!
//       xhr.addEventListener('load', function() {
//         var statusCode = xhr.status;
//         var statusText = xhr.statusText;
//         if (statusCode >= 200 && statusCode < 300) {
//           // Success: Status code is in the [200, 300) range.
//           // Call the callback with the final XHR object.
//           cb(xhr);
//         } else {
//           // Client or server error.
//           // The server may have included some response text with details concerning
//           // the error.
//           var responseText = xhr.responseText;
//           SoundRoomError('Could not ' + verb + " " + resource + ": Received " +
//             statusCode + " " + statusText + ": " + responseText);
//         }
//       });
//       // Time out the request if it takes longer than 10,000
//       // milliseconds (10 seconds)
//       xhr.timeout = 10000;
//       xhr.addEventListener('error', function() {
//         SoundRoomError('Could not ' + verb + " " + resource +
//         ": Could not connect to the server.");
//       });
//     //   // Network failure: request took too long to complete.
//       xhr.addEventListener('timeout', function() {
//         SoundRoomError('Could not ' + verb + " " + resource +
//         ": Request timed out.");
//       });
//         switch (typeof(body)) {
//         case 'undefined':
//         // No body to send.
//         xhr.send();
//         break;
//         case 'string':
//         // Tell the server we are sending text.
//
//         xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
//         xhr.send(body);
//         break;
//         case 'object':
//         // Tell the server we are sending JSON.
//         xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//         // Convert body into a JSON string.
//         xhr.send(JSON.stringify(body));
//         break;
//         default:
//         throw new Error('Unknown body type: ' + typeof(body));
//       }
// }

export function getUserInfo(user, cb) {
    // We don't need to send a body, so pass in 'undefined' for the body.
    sendXHR('GET', '/user/' + user + '/account_info', undefined, (xhr) => {
        // Call the callback with the data.
        cb(JSON.parse(xhr.responseText));
    });
}

export function createInfo(user, roomId, cb) {
    // We don't need to send a body, so pass in 'undefined' for the body.
    sendXHR('POST', '/createroom/' + roomId + '/' + user, undefined, (xhr) => {
        // Call the callback with the data.
        cb(JSON.parse(xhr.responseText));
    });
}

export function getUserPlaylist(user, cb) {
    sendXHR('GET', '/user/' + user + '/playlists', undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function createRoom(room, host, cb) {
    sendXHR('POST', '/createroom/' + host, {roomId: room}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function joinRoom(room, userId, cb) {
    sendXHR('POST', '/joinroom/' + userId, {roomId: room}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function getRoomParticipants(room, cb) {
    sendXHR('POST', 'participants', {roomId: room}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function getRoomData(room, cb) {
    sendXHR('POST', 'data', {roomId: room}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function addSongToRoom(room, song, user_id, cb) {
    sendXHR('POST', '/room/' + song + '/new_song', {roomId: room, userId: user_id}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function addLikeToSong(room, song, user_id, cb) {
    sendXHR('POST', '/room/song_like', {roomId: room, songId: song, userId: user_id}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function saveSongsAsPlayist(userId, roomId, playlistName, cb) {
    sendXHR('POST', '/room/save', {roomId: roomId, userId: userId, playlistName: playlistName}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function removeParticipant(participantId, roomId, cb) {
  sendXHR('DELETE', '/room/' + roomId + '/participants/' + participantId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function updateProfile(userId, newInfo, cb) {

    sendXHR('PUT', '/user/' + userId + '/account_info', {newInfo: newInfo}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function getRoomHost(roomId, cb) {
  console.log("getRoomHost activate");
  sendXHR('POST', '/room/host', {roomId: roomId}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function deleteRoom(roomId, cb) {
  sendXHR('DELETE', '/room/delete', {roomId: roomId}, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getRoomHostId(roomId, cb) {
    sendXHR('GET', '/room/host', {roomId: roomId}, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function textAccessCode(code, phonenumber, cb) {
  sendXHR('POST', '/room/sharecode/', {code: code, phonenumber: phonenumber}, (xhr) => {
      cb(JSON.parse(xhr.responseText));
  });
}

/**
* Reset database button.
*/
export class ResetDatabase extends React.Component {
    render() {
      return (
        <button className="btn btn-default" type="button" onClick={() => {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/resetdb');
          xhr.addEventListener('load', function() {
            window.alert("Database reset! Refreshing the page now...");
            document.location.reload(false);
          });
        xhr.send();
        }}>Reset Mock DB
      </button>
      );
    }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
