var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "SoundRoom";
// Put the initial mock objects here.
var initialData = {
    "users":{
        "1": {
          "_id": new ObjectID("000000000000000000000001"),
          "firstname": "Aarsh",
          "lastname": "Patel",
          "email": "aarshpatel@umass.edu",
          "username": "aarshpatel",
          "password": "stupid",
          "avatar": "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10399045_101311279883992_7165089_n.jpg?oh=3fb467ee0dcecd4a1ce8d501e4c69f63&oe=58C78EE4",
          "country": "US",
          "state": "MA",
          "city": "Amherst",
          "dob": "08/06/1996",
          "roomHostID": "1",
          "playlists": { // playlists hold trackID for songs
              "Party Songs": ["tracks/91168166", "tracks/158721013", "tracks/197028880"]
          }
      },
      "2": {
            "_id":new ObjectID("000000000000000000000002"),
            "firstname": "Bhavik",
            "lastname": "Jain",
            "email": "bjain@umass.edu",
            "username": "bjain",
            "password": "stupid",
            "avatar": "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10399045_101311279883992_7165089_n.jpg?oh=3fb467ee0dcecd4a1ce8d501e4c69f63&oe=58C78EE4",
            "country": "US",
            "state": "MA",
            "city": "Amherst",
            "dob": "04/10/1996",
            "roomHostID": "2",
            "playlists": {
                  "Party Songs": ["tracks/91168166", "tracks/158721013", "tracks/197028880"]
            }
        },
        "3": {
              "_id": new ObjectID("000000000000000000000003"),
              "firstname": "Siddarth",
              "lastname": "Patel",
              "email": "siddarthpate@umass.edu",
              "username": "siddarthpate",
              "password": "stupid",
              "avatar": "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10399045_101311279883992_7165089_n.jpg?oh=3fb467ee0dcecd4a1ce8d501e4c69f63&oe=58C78EE4",
              "country": "US",
              "state": "MA",
              "city": "Amherst",
              "dob": "02/18/1996",
              "roomHostID": null,
              "playlists": {
                  "Party Songs": ["tracks/91168166", "tracks/158721013", "tracks/197028880"]
              }
          },
          "4": {
                "_id":new ObjectID("000000000000000000000004"),
                "firstname": "Justin",
                "lastname": "Martinelli",
                "email": "justinmartinelli@umass.edu",
                "username": "justinmartinelli",
                "password": "stupid",
                "avatar": "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10399045_101311279883992_7165089_n.jpg?oh=3fb467ee0dcecd4a1ce8d501e4c69f63&oe=58C78EE4",
                "country": "US",
                "state": "NY",
                "city": "NYC",
                "dob": "04/10/1996",
                "roomHostID": null,
                "playlists": {
                    "Party Songs": ["tracks/91168166", "tracks/158721013", "tracks/197028880"]
                }
            }
    },
    "rooms": {
        "1": {
            "_id" : new ObjectID("000000000000000000000001"),
            "roomId": "1",
            "host": "000000000000000000000001",
            "participants": ["000000000000000000000001"],
            "playlist": []
        },
        "2": {
            "_id" : new ObjectID("000000000000000000000002"),
            "roomId": "2",
            "host": "000000000000000000000002",
            "participants": ["000000000000000000000002"],
            "playlist": []
        },
        "3": {
            "_id": new ObjectID("584e6c30d7cce5215cd029b8"),
            "roomId": "1isnnlku",
            "host": "000000000000000000000001",
            "participants": ["000000000000000000000001"],
            "Playlist": []
        }
    }
};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
