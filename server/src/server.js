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
    // Add user authentication here (getUserIdFromToken())
    var body = req.body;
    // var userAuth = getUserIdFromToken(req.get('Authorization'));
    // if(userAuth === body.userId){
    var userId = parseInt(req.params.userId,10);
    // res.status(201);
    res.send(getUserData(userId));
    // }
    // else{
    //   res.status(401).end();
    // }
});

app.get('/user/:userId/playlists', function(req, res) {
    // Add user authentication here (getUserIdFromToken)
    var body = req.body;
    // var userAuth = getUserIdFromToken(req.get('Authorization'));
    // if(userAuth === body.userId){
    var userId = parseInt(req.params.userId, 10);
    //   res.status(201);
    res.send(getUserPlaylistData(userId));
    // }
    // else{
    //   res.status(401).end();
    // }
});

app.post('/createroom/:roomId/:hostId', function(req, res) {
    var hostId = parseInt(req.params.hostId);
    var roomId = parseInt(req.params.roomId);

    // create a new room with a host and room id
    res.send(createRoom(hostId, roomId));

    // redirect the host to the new room
    res.redirect('/room/' + roomId);

});

app.post('/joinroom/:roomId/:userId', function(req, res) {
    var roomId = parseInt(req.params.roomId),
        userId = parseInt(req.params.userId);

    if(validateRoom(roomId)) {
        // validate that the room exists
        var roomData = getRoomData(roomId);

        // add to the rooms document a new participant and take them to the room
        res.send(roomData);
        roomData.participants.push(userId);
        writeDocument('rooms', roomData);
        res.redirect('/room/' + roomId)
        // res.send(roomData);
    } else {
        res.send("Room does not exists");
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
        roomId = parseInt(req.params.roomId),
        playlistName = body.playlistName,
        roomData = getRoomData(roomId).playlist,
        playlistsToSave = roomData.map((item) => item.trackID);
    res.send(saveSongsAsPlayist(userId, playlistName, playlistsToSave));
});

app.post('/room/:roomId/:songId/new_song', function(req, res) {
    var body = req.body,
        roomId = parseInt(req.params.roomId),
        songId = parseInt(req.params.songId),
        userThatAddedSong = body.userId;

    res.send(addSongToRoomPlaylist(roomId, userThatAddedSong, songId));

});

app.post('/room/:roomId/:songId/song_like', function(req, res) {
    var body = req.body,
        userId = body.userId,
        roomId = parseInt(req.params.roomId),
        songId = parseInt(req.params.songId);

    res.send(addLikeToSong(roomId, userId, songId));
});

function addLikeToSong(roomId, userId, songId) {
    var roomData = getRoomData(roomId);

    if(!validateSongLikes(roomId, userId, songId)) {
        for(var song in roomData.playlist) {
            if(songId === roomData.playlist[song].trackID) {
                roomData.playlist[song].likes += 1
                roomData.playlist[song].userLikes.push(userId);
            }
        }
    }

    writeDocument('rooms', roomData);
    return roomData;
}

function saveSongsAsPlayist(userId, playlistName, playlistsToSave) {
    if(!validatePlaylistName(userId, playlistName)) {
        var userData = readDocument("users", userId);
        userData.playlists[playlistName] = playlistsToSave;
        writeDocument('users', userData);
        return userData;
    }
    else {
        return "Playlist already exists";
    }
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

function getUserIdFromToken(authorizationLine) {
  try {
    var token = authorizationLine.slice(7);
    var regularString = new Buffer(token, 'base64').toString('utf8');
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    if (typeof id === 'number') {
      return id;
    } else {
      return -1;
    }
  } catch (e) {
    return -1;
  }
}

function getUserPlaylistData(userId) {
    return readDocument('users', userId)['playlists'];
}

function getUserData(userId) {
    return readDocument('users', userId);
}

function getSongsData(songId) {
    return readDocument('songs', songId);
}

function getRoomData(roomId) {
    return readDocument('rooms', roomId);
}

function addSongToRoomPlaylist(roomId, userId, songId) {
    var roomData = getRoomData(roomId);
    if(!validateSongsInRoomPlaylist(roomId, songId)) {
        var songDocument = {
            trackID: songId,
            likes: 1,
            userLikes: [userId]
        }
        roomData.playlist.push(songDocument);
        writeDocument('rooms', roomData);
        return roomData;
    }
    else {
        return "Song already in the playlist";
    }
}

function validateRoom(roomId) {
    return true;
}

function validateSongsInRoomPlaylist(roomId, songId) {
    var roomData = getRoomData(roomId);
    for(var songs in roomData.playlist) {
        var checkSong = roomData.playlist[songs].trackID;
        if(checkSong === songId) return true;
    }
    return false;
}

function validateSongLikes(roomId, userId, songId){
  var roomData = getRoomData(roomId);
  for (var song in roomData.playlist){
    if(songId === roomData.playlist[song].trackID){
        for(var user in roomData.playlist[song].userLikes) {
            if(userId == roomData.playlist[song].userLikes[user]) {
                return true;
            }
        }
    }
  }
  return false;
}

function validatePlaylistName(userId, playlistName) {
    var userData = getUserData(userId);
    for(var plName in userData.playlists) {
        if(playlistName === plName) {
            return true;
        }
    }
    return false;
}
// Starts the server on port 3000!
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
