// Your startup's initial mock objects go here
var initialData = {
    "users":{
        "1": {
          "_id":1,
          "firstname": "Aarsh",
          "lastname": "Patel",
          "email": "aarshpatel@umass.edu",
          "nickname": "AP",
          "avatar": "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10399045_101311279883992_7165089_n.jpg?oh=3fb467ee0dcecd4a1ce8d501e4c69f63&oe=58C78EE4",
          "description": "Hello everyone, I'm a mock user",
          "country": "US",
          "state": "MA",
          "dob": "08/06/1996",
          "city": "Amherst",
          "roomHostID": null,
          "playlists": { // playlists hold trackID for songs
              "Beach Songs": ["1", "2", "3", "4", "5"],
              "Rock N Roll":["6", "7"],
              "Party": ["8", "9"],
              "Hip Hop": ["10", "11", "12"]
          }
      },
      "2": {
            "_id":2,
            "firstname": "Bhavik",
            "lastname": "Jain",
            "email": "bjain@umass.edu",
            "nickname": "Bjain",
            "avatar": "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10399045_101311279883992_7165089_n.jpg?oh=3fb467ee0dcecd4a1ce8d501e4c69f63&oe=58C78EE4",
            "description": "Hello everyone, I'm a mock user",
            "country": "US",
            "state": "MA",
            "dob": "04/10/1996",
            "city": "Amherst",
            "roomHostID": null,
            "playlists": {
                "Drake Playlists": ["1", "2", "3", "4", "5"],
                "Logic Playlists (Awesome)":["2", "3"]
            }
        },
        "3": {
              "_id":3,
              "firstname": "Siddarth",
              "lastname": "Patel",
              "email": "siddarthpate@umass.edu",
              "nickname": "Sid",
              "avatar": "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10399045_101311279883992_7165089_n.jpg?oh=3fb467ee0dcecd4a1ce8d501e4c69f63&oe=58C78EE4",
              "description": "Hello everyone, I'm a mock user",
              "country": "US",
              "state": "MA",
              "dob": "02/18/1996",
              "city": "Amherst",
              "roomHostID": null,
              "playlists": {
                  "Drake Playlists": ["1", "2", "3", "4", "5"],
                  "Logic Playlists (Awesome)":["2", "3"]
              }
          },
          "4": {
                "_id":4,
                "firstname": "Justin",
                "lastname": "Martinelli",
                "email": "justinmartinelli@umass.edu",
                "nickname": "Jus",
                "avatar": "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10399045_101311279883992_7165089_n.jpg?oh=3fb467ee0dcecd4a1ce8d501e4c69f63&oe=58C78EE4",
                "description": "Hello everyone, I'm a mock user",
                "country": "US",
                "state": "NY",
                "dob": "04/10/1996",
                "city": "NYC",
                "roomHostID": null,
                "playlists": {
                    "Drake Playlists": ["1", "2", "3", "4", "5"],
                    "Logic Playlists (Awesome)":["2", "3"]
                }
            },
            "5": {
                  "_id":5,
                  "firstname": "Lynn",
                  "lastname": "Samson",
                  "email": "lasamson@umass.edu",
                  "nickname": "Lynn",
                  "avatar": "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10399045_101311279883992_7165089_n.jpg?oh=3fb467ee0dcecd4a1ce8d501e4c69f63&oe=58C78EE4",
                  "description": "Hello everyone, I'm a mock user",
                  "country": "US",
                  "state": "MA",
                  "dob": "01/10/1997",
                  "city": "Amherst",
                  "roomHostID": null,
                  "playlists": {
                      "Drake Playlists": ["1", "2", "3", "4", "5"],
                      "Logic Playlists (Awesome)":["2", "3"]
                  }
              },
              "6": {
                    "_id":6,
                    "firstname": "Ronit",
                    "lastname": "Arora",
                    "email": "rarora@umass.edu",
                    "nickname": "Ron",
                    "avatar": "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/10399045_101311279883992_7165089_n.jpg?oh=3fb467ee0dcecd4a1ce8d501e4c69f63&oe=58C78EE4",
                    "description": "Hello everyone, I'm a mock user",
                    "country": "US",
                    "state": "MA",
                    "dob": "04/10/1996",
                    "city": "Amherst",
                    "roomHostID": null,
                    "playlists": {
                        "Drake Playlists": ["1", "2", "3", "4", "5"],
                        "Logic Playlists (Awesome)":["2", "3"]
                    }
                }
    },
    "songs": {
        "1": {
            "_id": 1,
            "title":  "Pt. 2",
            "artist": "Kayne West",
            "album": "Life of Pablo"
        },
        "2": {
            "_id": 2,
            "title": "Welcome to Heartbreak",
            "artist": "Kayne West",
            "album": "808s Hearbreak"
        },
        "3": {
            "_id": 3,
            "title": "Starboy",
            "artist": "The Weeknd",
            "album": "Starboy"
        },
        "4": {
            "_id": 4,
            "title": "Now and forever",
            "artist": "Drake",
            "album": "If you are reading this"
        },
        "5": {
            "_id": 5,
            "title": "Soul Food",
            "artist": "Logic",
            "album": "Underpressure"
        },
        "6": {
            "_id": 6,
            "title": "Logic - Wrist (Feat. Pusha T) TeamVisionary",
            "artist": "Logic",
            "album": "Hip-hop & Rap",
            "soundcloud_url": "https://soundcloud.com/youngzean/logic-wrist-feat-pusha-t",
            "artwork_url": "https://i1.sndcdn.com/artworks-000169098013-7c3uj9-large.jpg"
        },
        "7": {
            "_id": 7,
            "title": "Man of the year",
            "artist": "Logic",
            "album": "Hip-hop/rap",
            "soundcloud_url": "https://soundcloud.com/swagytracks/logic-man-of-the-year-prod-no",
            "artwork_url": "https://i1.sndcdn.com/artworks-000047449930-2d124v-large.jpg"
        },
        "8": {
            "_id": 8,
            "title": "Lose",
            "artist": "Travis Scott",
            "album": "Birds and Trap Scene"
        },
        "9": {
            "_id": 9,
            "title": "Break your heart",
            "artist": "Taio Cruz",
            "album": "Rakstarr"
        },
        "10": {
            "_id": 10,
            "title": "Two Reasons",
            "artist": "Trey Songz",
            "album": "Chapter V",
            "soundcloud_url": "https://soundcloud.com/anderssivgaard/trey-songz-remixet"
        },
        "11": {
            "_id": 11,
            "title": "Recognize",
            "artist": "PartyNextDoor",
            "album": "PartyNextDoor Two",
            "soundcloud_url": "https://soundcloud.com/partyomo/partynextdoor-recognize-feat-drake"
        },
        "12": {
            "_id": 12,
            "title": "Stainless",
            "artist": "Stainless",
            "album": "Incredible True Story",
            "soundcloud_url": "https://soundcloud.com/teamvisionary/stainless"
        }
    },
    "rooms": {
        "1": {
            "_id" : 1,
            "host": "1",
            "participants": ["2", "3"],
            "playlists": [{"trackID": "2", "likes": 0}, {"trackID": "1", "likes": 0}, {"trackID": "10", "likes": 0}]
        },
        "2": {
            "_id" : 2,
            "host": "2",
            "participants": ["4", "5"],
            "playlists": [{"trackID": "3", "likes": 0}, {"trackID": "4", "likes": 0}, {"trackID": "4", "likes": 0}]
        }
    }
};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
