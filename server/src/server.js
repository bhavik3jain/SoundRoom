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

app.post('/createroom/:roomId/:hostId', function(req, res) {
    var hostId = parseInt(req.params.hostId);
    var roomId = parseInt(req.params.roomId);
    // Add user authentication here (getUserIdFromToken)

    // create a new room with a host and room id
    createRoom(hostId, roomId);

    // redirect the host to the new room
    res.redirect('/room/' + roomId);

});

app.post('/joinroom/:roomId/:userId', function(req, res) {
    var roomId = parseInt(req.params.roomId),
        userId = parseInt(req.params.userId),
        var roomData = getRoomData(roomId);

    if(validateRoom(roomId)) {
        // validate that the room exists

        // add to the rooms document a new participant and take them to the room
        roomData.participants = roomData.participants.push(userId);
        writeDocument('rooms', roomData);

        res.redirect('/room/' + roomId)

    }
});

app.get("/room/:roomId", function(req, res) {
    var roomId = parseInt(req.params.roomId),
        roomData = getRoomData(roomId);

    res.send(roomData);
});

app.post('/room/:roomId/:userId/save', function(req, res) {
    var body = req.body,
        userId = parseInt(req.params.userId),
        roomId = parseInt(req.params.userId),
        playlistName = body.playlistName,
        roomData = getRoomData(roomId)['playlists'],
        playlistsToSave = roomData.map((item) => item.trackID);

    res.send(saveSongsAsPlayist(userId, playlistName, playlistsToSave));
});

function saveSongsAsPlayist(userId, playlistName, playlistsToSave) {
    var userData = readDocument("users", userId);
    userData.playlists[playlistName] = playlistsToSave;
    writeDocument('users', userData);
}


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

function getSongsData(songId) {
  var songList = readDocument('songs', songId);
  return songList;
}

function getRoomData(roomId) {
    var roomData = readDocument('rooms', roomId);
    return roomData;
}

function validateRoom(roomId) {
return true;
}
