var express = require('express');
var app = express();
var twilio = require('twilio');
var async = require('async');

var client = twilio('ACa1c9c14903d2f008379e589ffe5ac411', '6a7fbad6cf389a25894ebf421df5a4a0');

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

//schemas
var roomSchema = require('./schemas/room.json');
var songSchema = require('./schemas/song.json');
var userInfoSchema = require('./schemas/userInfo.json');
var playlistSchema = require('./schemas/playlist.json');
var validate = require('express-jsonschema').validate;

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/SoundRoom';
var ResetDatabase = require('./resetdatabase');

MongoClient.connect(url, function(err, db) {
    // Starts the server on port 3000!
    const server = app.listen(3001, function () {
        console.log('Soundroom app listening on port 3001!');
    });

    const io = require("socket.io")(server);

    io.on('connection', (socket) => {
        console.log("A user has connected to SoundRoom");
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });


    app.use('/mongo_express', mongo_express(mongo_express_config));

    app.get('/user/:userId/account_info', function(req, res) {
        // Add user authentication here (getUserIdFromToken())
        var body = req.body;
        var userId = req.params.userId;
        var userAuth = getUserIdFromToken(req.get('Authorization'));
        // if(userAuth === userId){
            getUserData(userId, function(err, userData) {
                if(err) res.status(500).end();
                else {
                    res.status(200).send(userData);
                }
            });
        // }
        // else{
        //   res.status(401).end();
        // }

    });

    app.put('/user/:userId/account_info', validate({userInfoSchema}), function(req, res) {
        var body = req.body;
        var userId = req.params.userId;
        var userAuth = getUserIdFromToken(req.get('Authorization'));

        // if(userAuth === userId) {
            getUserData(userId, function(err, user) {
                if(err) res.status(500).end();
                else {
                    user.firstname = body.newInfo.firstName;
                    user.lastname = body.newInfo.lastName;
                    user.email = body.newInfo.email;
                    user.country = body.newInfo.country;
                    user.dob = body.newInfo.dob;
                    updateUserProfile(userId, user, function(err, updatedProfile) {
                        if(err) res.status(500).end();
                        else res.status(200).send(updatedProfile);
                    });
                }
            });
        // }
        // else {
        //     res.status(401).end();
        // }
    });

    app.get('/user/:userId/playlists', function(req, res) {
        var body = req.body;
        var userAuth = getUserIdFromToken(req.get('Authorization'));
        var userId = req.params.userId;

        // if(userAuth === userId){
          getUserPlaylistData(userId, function(err, playlistData) {
              if(err) res.status(500).end();
              else res.status(200).send(playlistData);
          });
        // }
        // else{
        //   res.status(401).end();
        // }
    });

    app.post('/createroom/:hostId', validate({roomSchema}), function(req, res) {
        var body = req.body;
        var hostId = req.params.hostId;
        // var hostId = body.hostId;
        var roomId = body.roomId;

        validateRoom(roomId, function(err, validatedRoom) {
            validateRoomHost(hostId, function(err, validatedHostId){
                if(!validatedRoom && !validatedHostId) {
                    createRoom(hostId, roomId, function(err, roomData) {
                      if (err) {
                        res.status(500).end();
                      }
                      else {
                        res.status(200).send(roomData);
                      }
                    });
                }
                else {
                    var error = {
                        message: "You cannot create a room that already exists or you are already a host for another room",
                        success: false
                    };
                    res.status(400).send(error.message);
                }
            });
        });
        // } else {
        //   res.status(400).send("Room already exists or host already hosting room");
        // }


        // var body = req.body;
        // var hostId = req.params.hostId,
        //     roomId = body.roomId;
        //
        // //var userAuth = getUserIdFromToken(req.get('Authorization'));
        // //if(userAuth === body.userId){
        //   if(!validateRoom(roomId) && !validateRoomHost(hostId)) {
        //       // create a new room with a host and room id
        //       res.send(createRoom(hostId, roomId));
        //       // redirect the host to the new room
        //       // res.redirect('/room/' + roomId);
        //   }
        //   else {
        //
        //       var error = {
        //           message: "You cannot create a room that already exists or you are already a host for another room",
        //           success: false
        //       }
        //       res.status(400)
        //       res.send(error.message);
        //   }
        // //}
        // //else{
        // //   res.status(401).end();
        // //}
    });

    app.post('/joinroom/:userId', validate({roomSchema}), function(req, res) {
        var body = req.body;
        var roomId = body.roomId,
            userId = req.params.userId;

        //var userAuth = getUserIdFromToken(req.get('Authorization'));
        //if(userAuth === body.userId){
        validateRoom(roomId, function(err, validatedRoom) {
            if(validatedRoom) {
                getRoomData(roomId, function(err, roomData) {
                    if(err) res.status(500).end();
                    else {
                        var userInRoom = false;
                        for(var participant in roomData.participants) {
                            if(userId == roomData.participants[participant]) {
                                userInRoom = true;
                            }
                        }

                        if(!userInRoom) {
                            console.log("User not in the room", userId);
                            roomData.participants.push(userId);
                            db.collection('rooms').updateOne({"roomId": roomId}, roomData, function(err, newRoomData) {
                                if(err) res.status(500).end();
                                else {
                                    db.collection('rooms').findOne({"roomId": roomId}, function(err, newRoomDataResult) {
                                        res.status(200);
                                        res.send({"success": true});
                                        io.emit("joinroom", newRoomDataResult);
                                    });
                                }
                            });
                        } else {
                            console.log("User in the room");
                            console.log("Room Data for user already in the room: ", roomData);
                            res.status(200);
                            res.send({"success": true});
                            io.emit("joinroom", roomData);
                        }
                    }
                });
            }
            else {
                res.status(400);
                res.send("Room " + roomId + " does not exist");
            }
        })
        //}
        //else{
        //   res.status(401).end();
        //}
    });



    app.post("/room/data", validate({roomSchema}), function(req, res) {
        var body = req.body;
        var roomId = body.roomId;
        getRoomData(roomId, function(err, roomData) {
            if(err) res.status(400).end();
            else res.status(200).send(roomData);
        });
    });

    app.post('/room/save', validate({playlistSchema}), function(req, res) {
        console.log("Saving room playlist");
        var body = req.body,
            userId = body.userId,
            roomId = body.roomId,
            playlistName = body.playlistName;

        getRoomData(roomId, function(err, roomData) {
            if(err) res.status(500).end();
            else {
                playlistsToSave = roomData.playlist.map((item) => "tracks/" + item.trackID);
                saveSongsAsPlayist(userId, playlistName, playlistsToSave, function(err, newUserData) {
                    if(err) res.status(500).send(err.message);
                    else {
                        res.status(200).send(newUserData);
                    }
                });
            }
        });

        //var userAuth = getUserIdFromToken(req.get('Authorization'));
        //if(userAuth === body.userId){

        //else{
        //   res.status(401).end();
        //}
    });

    app.post('/room/:songId/new_song', validate({songSchema}), function(req, res) {
        var body = req.body,
            roomId = body.roomId,
            songId = parseInt(req.params.songId),
            userThatAddedSong = body.userId;
        //var userAuth = getUserIdFromToken(req.get('Authorization'));
        //if(userAuth === body.userId){
        addSongToRoomPlaylist(roomId, userThatAddedSong, songId, function(err, newRoomData) {
            if(err) {
                res.status(400).end(err.message);
            }
            else {
                res.status(200).send(newRoomData);
                io.emit("add song to room", newRoomData);
            }
        });
        //}
        //else{
        //   res.status(401).end();
        //}
    });

    app.post('/room/song_like', validate({songSchema}), function(req, res) {
        var body = req.body,
            userId = body.userId,
            roomId = body.roomId,
            songId = body.songId;
        //var userAuth = getUserIdFromToken(req.get('Authorization'));
        //if(userAuth === body.userId){
          addLikeToSong(roomId, userId, songId, function(err, newRoomData) {
              if(err) res.status(400).send(newRoomData);
              else {
                  if('message' in newRoomData) {
                      res.status(400);
                      res.send(newRoomData['message']);
                  } else {
                      res.send(newRoomData);
                      io.emit("song like", newRoomData);
                  }
              }
          });
        //   res.send(addLikeToSong(roomId, userId, songId));
        //}
        //else{
        //   res.status(401).end();
        //}
    });

    app.post('/room/participants', validate({roomSchema}), function(req, res)  {
        var body = req.body,
            roomId = body.roomId;
        //var userAuth = getUserIdFromToken(req.get('Authorization'));
        //if(userAuth === body.userId){
        getRoomParticipants(roomId, function(err, participants) {
            if(err) res.status(400).end();
            else res.status(200).send(participants);
        });
        //}
        //else{
        //   res.status(401).end();
        //}
    });

    app.get('/song/:songId', function(req, res) {
        var body = req.body,
            songId = parseInt(req.params.songId);
          res.status(201);
          res.status(200).send(getSongMetadata(songId));
    });

    // Reset database.
    app.post('/resetdb', function(req, res) {
      console.log("Resetting database...");
      // This is a debug route, so don't do any validation.
      database.resetDatabase();
      // res.send() sends an empty response with status code 200
      res.send();
    });

    app.delete('/room/:roomId/participants/:participantid', function(req, res) {
      var roomId = req.params.roomId;
      var participantId = req.params.participantid;
      getRoomData(roomId, function(err, roomData) {
          if(err) res.status(500).end();
          else {
              var participantIndex = roomData.participants.indexOf(participantId);
              if (participantIndex != -1) {
                roomData.participants.splice(participantIndex, 1);
                db.collection('rooms').updateOne({"roomId": roomId}, roomData, function(err, newRoomData) {
                    if(err) res.status(500).end();
                    else {
                        io.emit("remove participant", {"message": "Deleted participant from room"});
                        res.send({message: "Deleted participant from room"});
                    }
                });
              }
          }
      });
    });

    app.post('/room/host', function(req, res) {
      var roomId = req.body.roomId;
      getRoomData(roomId, function(err, roomData) {
          if(err) {
              res.status(500).end();
          }
          else {
              res.status(200);
              res.send({"host": roomData.host});
          }
      });
    });

    app.delete('/room/delete', function(req, res) {
      var roomId = req.body.roomId;

      getRoomData(roomId, function(err, roomData) {
          if(err) res.status(400).end();
          else {
              var hostId = roomData.host;
              getUserData(hostId, function(err, userData) {
                  if(err) res.status(500).end();
                  else {
                      userData.roomHostID = null;
                      db.collection('users').updateOne({"_id": new ObjectID(hostId)}, userData, function(err, newUserData) {
                          if(err) res.status(400).end();
                      });

                      db.collection('rooms').deleteOne({"roomId": roomId}, function(err, newRoomData) {
                          if(err) res.status(400).end();
                          else {
                              res.send({"deleted": true});
                              io.emit("delete room", {"deleted": true, "message": "Room is being deleted. Taking you back to the home page"});
                          }
                      });
                  }
              });
          }
      });
    });


    app.post('/room/sharecode/', function(req, res) {
      var body = req.body,
          code = body.code,
          phonenumber = body.phonenumber;

      client.sendMessage({
        to: phonenumber,
        from: '7745411238',
        body: 'Access Code: ' + code
      }, function(err, responseData) {
        if(!err) {
          res.send({"message": "Access Code sent to " + phonenumber, "success": true});
        } else {
          console.log(err);
        }
      });
    });


  app.delete('/room/delete_song', function(req, res) {
        var body = req.body;
        var roomId = body.roomId;
        var songId = body.songId;

        deleteSongFromRoom(roomId, songId, function(err, newRoomData) {
          if(err) res.status(500).send(err);
          else {
            res.status(200).send(newRoomData);
            io.emit("delete song", newRoomData);
          }
        });
    });


    function deleteSongFromRoom(roomId, songId, cb) {
      getRoomData(roomId, function(err, roomData) {
        if(err) cb(err);
        else {
          for(var song in roomData.playlist) {
            if(roomData.playlist[song].trackID === songId) {
              roomData.playlist.splice(song, 1);
            }
          }

          db.collection('rooms').updateOne({"roomId": roomId}, roomData, function(err, newUpdatedRoomData) {
            if(err) cb(err);
            else {
              getRoomData(roomId, function(err, newRoomData) {
                if(err) cb(err);
                else {
                  cb(null, newRoomData);
                }
              });
            }
          });
        }
      });
    }

    /* Gets the participants (first and last name) from the room  */
    function getRoomParticipants(roomId, cb) {
        getRoomData(roomId, function(err, roomData) {
            var participantsIds = [];
            for(var id in roomData.participants) {
                participantsIds.push(roomData.participants[id]);
            }

            var participants = [];
            async.each(participantsIds, function(id, callback) {
                getUserData(id, function(err, userData) {
                    participants.push(userData.firstname + " " + userData.lastname);
                    callback(null);
                });
            }, function(err) {
                cb(null, {"participants": participants});
            });

        });

    }

    /* Adds a like to a song for a given user in a room playlist */
    function addLikeToSong(roomId, userId, songId, cb) {
        getRoomData(roomId, function(err, roomData) {
            if(err) cb(err);
            else {
                validateSongLikes(roomId, userId, songId, function(err, userLikedSongAlready) {
                    if(!userLikedSongAlready) {
                        for(var song in roomData.playlist) {
                            if(songId === roomData.playlist[song].trackID) {
                                roomData.playlist[song].likes += 1
                                roomData.playlist[song].userLikes.push(userId);
                            }
                        }
                        db.collection("rooms").updateOne({"roomId": roomId}, roomData, function(err, newRoomData) {
                            if(err) cb(err);
                            else {
                                getRoomData(roomId, function(err, newUpdatedRoomData) {
                                    if(err) cb(err);
                                    else cb(null, newUpdatedRoomData);
                                });
                            }
                        });
                    }
                    else {
                        cb(null, {message: "You can't like the same song more than once", success: false});
                    }
                })
            }
        });

    }

    /* Save songs in the room as a playlist for a user to listen to later */
    function saveSongsAsPlayist(userId, playlistName, playlistsToSave, cb) {
        validatePlaylistName(userId, playlistName, function(err, playlistExists) {
            if(!playlistExists) {
                getUserData(userId, function(err, userData) {
                    if(err) cb(err);
                    else {
                        userData.playlists[playlistName] = playlistsToSave;
                        savePlaylistToUserAccount(userId, userData, function(err, newUserData) {
                            if(err) cb(err);
                            else {
                                cb(null, newUserData);
                            }
                        });
                    }
                });
            }
            else {
                cb({message: "Playlist already exists or there are no songs to save", success: false});
            }
        });
    }

    function savePlaylistToUserAccount(userId, userData, cb) {
        db.collection('users').updateOne({"_id": new ObjectID(userId)}, userData, function(err, newUserData) {
            if(err) cb(err);
            else {
                console.log("new user data from savePlaylistToUserAccount", newUserData);
                getUserData(userId, function(err, newUpdatedUserData) {
                    if(err) cb(err);
                    else cb(null, newUpdatedUserData);
                });
            }
        });
    }

    function createRoom(hostId, roomId, cb) {

        // update users roomHostID key in the users table
        // var userAccountInfo = readDocument('users', hostId);
        getUserData(hostId, function(err, userData) {
            if(err) cb(err);
            else {
                userData.roomHostID = roomId;
                updateUserRoomHostId(hostId, userData, function(err, newUserData) {
                    if(err) cb(err);
                });

                // create a new empty room in the table
                var newRoomDocument = {
                    "roomId": roomId,
                    "host": hostId,
                    "participants": [hostId],
                    "playlist": []
                };

                console.log("New Room Document", newRoomDocument);

                db.collection('rooms').insertOne(newRoomDocument, function(err, updatedRoom) {
                    if(err) cb(err);
                    else cb(null, updatedRoom.ops[0]);
                });
            }
        });

    }

    /* Updates the room host id parameter in the User object */
    function updateUserRoomHostId(userId, userData, cb) {
        db.collection("users").updateOne({"_id": new ObjectID(userId)}, userData, function(err, newUserData) {
            if(err) cb(err);
            else {
                cb(null, newUserData);
            }
        });
    }

    function getUserIdFromToken(authorizationLine) {
        try {
          // Cut off "Bearer " from the header value.
          var token = authorizationLine.slice(7);
          // Convert the base64 string to a UTF-8 string.
          var regularString = new Buffer(token, 'base64').toString('utf8');
          // Convert the UTF-8 string into a JavaScript object.
          var tokenObj = JSON.parse(regularString);
          var id = tokenObj['id'];
          // Check that id is a number.
          if (typeof id === 'string') {
            return id;
          } else {
            // Not a number. Return -1, an invalid ID.
            return "";
          }
        } catch (e) {
          // Return an invalid ID.
          return -1;
        }
    }

    /* Gets the users playlist from the database */
    function getUserPlaylistData(userId, cb) {
         db.collection('users').findOne({"_id": new ObjectID(userId)}, function(err, userData) {
             if(err) return cb(err);
             else return cb(null, userData.playlists);
         });
     }

     /* Gets the user data from the database */
     function getUserData(userId, cb) {
        db.collection('users').findOne({"_id": new ObjectID(userId)}, function(err, userData) {
            if(err) return cb(err);
            else return cb(null, userData);
        });
     }

     /* Updates the user's profile with new information */
    function updateUserProfile(userId, newUserData, cb) {
        db.collection('users').updateOne({
            _id: new ObjectID(userId)
        }, newUserData, function(err, updateResult) {
            if(err) {
                return cb(err);
            } else {
                return cb(null, updateResult);
            }
        });
    }

    /* Gets the room's data (particpants, playlists, hostId) from the database */
    function getRoomData(roomId, cb) {
        db.collection('rooms').findOne({"roomId": roomId}, function(err, roomData){
            if(err) cb(err);
            else {
                // console.log("Room data", roomData);
                if(roomData === null) {
                  console.log("roomData is null when: ", roomId);
                } else {
                  cb(null, roomData);
                }
            }
        });
    }

    /* Adds a song to the room playlist */
    function addSongToRoomPlaylist(roomId, userId, songId, cb) {
        getRoomData(roomId, function(err, roomData) {
            if(err) cb(err);
            else {
                validateSongsInRoomPlaylist(roomId, songId, function(err, songInRoom) {
                    if(!songInRoom) {
                        var songDocument = {
                            trackID: songId,
                            likes: 1,
                            userLikes: [userId]
                        }

                        roomData.playlist.push(songDocument);
                        db.collection('rooms').updateOne({"roomId": roomId}, roomData, function(err, roomDataResult) {
                            if(err) cb(err);
                            else {
                                db.collection('rooms').findOne({"roomId": roomId}, function(err, newRoomData) {
                                    if(err) cb(err);
                                    else cb(null, newRoomData);
                                });
                            }
                        });
                    } else {
                        cb({"message": "Song already in the playlist"});
                    }
                });
            }
        });

    }

    /* Validates the room id by checking to see if that roomId exists or not */
    function validateRoom(roomId, cb) {
        db.collection('rooms').find({"roomId": roomId}).limit(1).count().then(function(result){
            cb(null, result > 0);
        });
    }


    /* Checks to see if the song exists in the room or not */
    function validateSongsInRoomPlaylist(roomId, songId, cb) {
        getRoomData(roomId, function(err, roomData) {
            if(err) cb(err);
            else {
                var songInRoom = false;
                for(var songs in roomData.playlist) {
                    var checkSong = roomData.playlist[songs].trackID;
                    if(checkSong === songId) {songInRoom = true;}
                }
                cb(null, songInRoom);
            }
        });

    }

    /* Checks to see if the user already like the song in the room's playlist or not */
    function validateSongLikes(roomId, userId, songId, cb){
        getRoomData(roomId, function(err, roomData){
            if(err) cb(err);
            else {
                var userLikedSongAlready = false;
                for (var song in roomData.playlist){
                  if(songId === roomData.playlist[song].trackID){
                      for(var user in roomData.playlist[song].userLikes) {
                          if(userId == roomData.playlist[song].userLikes[user]) {
                              userLikedSongAlready = true;
                          }
                      }
                  }
                }
                cb(null, userLikedSongAlready);
            }
        });
    }

    /* Checks to see if the playlist is already save to the user's account */
    function validatePlaylistName(userId, playlistName, cb) {
        getUserData(userId, function(err, userData) {
            if(err) cb(err);
            else {
                var playlistExists = false;
                for(var plName in userData.playlists) {
                    if(playlistName === plName) {
                        playlistExists = true;
                    }
                }
                cb(null, playlistExists);
            }
        });
    }

    /* Checks to see if the user is already a host of another room */
    function validateRoomHost(hostId, cb) {
        db.collection('rooms').find({"host": hostId}).count().then(function(result) {
            cb(null, result > 0);
        });
    }

    function getRoomByAccessCode(code) {
        var rooms = getCollection('rooms');
        for(var room in rooms) {
            if(rooms[room].roomId == code) {
                return rooms[room];
            }
        }
    }

    function getSongMetadata(songId) {
        SC.initialize({
            client_id: 'd0cfb4e9bb689b898b7185fbd6d13a57'
        });

        return SC.get("tracks/" + songId);
    }
});
