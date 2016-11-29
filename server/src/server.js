// Implement your server in this file.
// We should be able to run your server with node src/server.js
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static('../client/build'));

//import database functions
var database = require('./database.js');
var readDocument = database.readDocument;
var addDocument = database.addDocument;
var writeDocument = database.writeDocument;
var deleteDocument = database.deleteDocument;

app.get('/user/:userId/account_info', function(req, res) {
    var userId = parseInt(req.params.userId,10);
    // Add user authentication here (getUserIdFromToken())
    res.send(getUserData(userId));
});

app.get('/user/:userId/playlists', function(req, res) {
    var userId = parseInt(req.params.userId, 10);
    // Add user authentication here (getUserIdFromToken)
    res.send(getUserPlaylistData(userId));
});

app.post('/room/:hostId/:roomId', function(req, res) {
    var hostId = parseInt(req.params.hostId);
    var roomId = parseInt(req.params.roomId);
    // Add user authentication here (getUserIdFromToken)
    rss.send(createRoom(hostId, roomId));
});

function createRoom(hostId, roomId) {

    // update users roomHostID key in the users table
    var userAccountInfo = readDocument('users', hostId);
    userAccountInfo.roomHostID = roomId;
    writeDocument('users', userAccountInfo);

    // create a new empty room in the table
    var newRoomDocument = {
        "roomId": roomId,
        "host": hostId,
        "participants": [hostId],
        "playlists": []
    };
    var newRoom = addDocument('rooms', newRoomDocument);

    return newRoom;
}

function getUserPlaylistData(userId) {
  var userPlaylists = readDocument('users', user)['playlists'];
  return userPlaylists;
}

function getUserData(userId) {
    var userData = readDocument('users', userId);
    return userData;
}

export function getSongsData(songId) {
  var songList = readDocument('songs', songId);
  return songList;
}
