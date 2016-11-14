import {readDocument, writeDocument, addDocument,readAllDocuments} from './database.js';

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
export function getSongsForPlaylist(playlistID, cb) {
    var songsData = readDocument('user', user)['playlists']
}

export function getRoomIds(){

    var roomIds = readAllDocuments("rooms");
    return roomIds;
}

// TODO:
// export function addPlaylistToRoom(roomID, cb) {
//     var roomData = readDocument("room", roomID);
// // }
