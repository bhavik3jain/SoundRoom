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
var getCollection = database.getCollection;

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

// 
// app.put('/user/:userId/account_info', function(req, res) {
//   var body = req.body;
//
//     // Check that the body is a string, and not something like a JSON object.
//
//     if (typeof(req.body) !== 'string') {
//       // 400: Bad request.
//       res.status(400).end();
//       return;
//     }
//     // Update text content of update.
//     feedItem.contents.contents = req.body;
//     writeDocument('database', feedItem);
//     res.send(getFeedItemSync(feedItemId));
//
// });


app.get('/user/:userId/playlists', function(req, res) {
    // Add user authentication here (getUserIdFromToken)
    var body = req.body;
    // var userAuth = getUserIdFromToken(req.get('Authorization'));
    // if(userAuth === body.userId){
    var userId = req.params.userId;
    res.send(getUserPlaylistData(userId));
});

app.post('/createroom/:roomId/:hostId', function(req, res) {
    var hostId = req.params.hostId,
        roomId = parseInt(req.params.roomId);
    console.log("createRoom");
    if(!validateRoom(roomId) && !validateRoomHost(hostId)) {
        // create a new room with a host and room id
        res.send(createRoom(hostId, roomId));
        // redirect the host to the new room
        // res.redirect('/room/' + roomId);
    }
    else {
        res.send("You cannot create a room that already exists or you are already a host for another room");
     }

});

app.post('/joinroom/:roomId/:userId', function(req, res) {
    var roomId = parseInt(req.params.roomId),
        userId = req.params.userId;

    if(validateRoom(roomId)) {
        // validate that the room exists
        var roomData = getRoomData(roomId);

        // add to the rooms document a new participant and take them to the room
        roomData.participants.push(userId);
        writeDocument('rooms', roomData);
        res.redirect('/room/' + roomId)
        res.send(roomData);
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

app.get('/room/:roomId/participants', function(req, res)  {
    var body = req.body,
        roomId = parseInt(req.params.roomId);

    res.send(getRoomParticipants(roomId));
});

app.get('/song/:songId', function(req, res) {
    var body = req.body,
        songId = parseInt(req.params.songId);

    res.send(getSongMetadata(songId));
})
function getRoomParticipants(roomId) {
    var roomData = getRoomData(roomId);
    var participantsIds = [];
    for(var id in roomData.participants) {
        participantsIds.push(roomData.participants[id]);
    }

    var participants = participantsIds.map((id) => {
        var userData = getUserData(id);
        return userData.firstname + " " + userData.lastname;
    });

    return participants;
}

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
    var playlist = readDocument('users', userId).playlists
    return playlist;
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
    var roomCollection = getCollection('rooms');
    var roomIds = Object.keys(roomCollection).map((item) => parseInt(item));
    for(var id in roomIds) {
        if(roomIds[id] === roomId) return true;
    }
    return false;
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

function validateRoomHost(hostId) {
    var rooms = getCollection('rooms');
    for(var room in rooms) {
        if(rooms[room].host === hostId) {
            return true;
        }
    }
    return false;
}

function getSongMetadata(songId) {
    SC.initialize({
        client_id: 'd0cfb4e9bb689b898b7185fbd6d13a57'
    });

    return SC.get("tracks/" + songId);
}

// Starts the server on port 3000!
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
