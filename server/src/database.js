// Your startup's initial mock objects go here

var ObjectID = require('mongodb').ObjectID;
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
            "host": "1",
            "participants": [new ObjectID("000000000000000000000001")],
            "playlist": []
        },
        "2": {
            "_id" : new ObjectID("000000000000000000000002"),
            "roomId": "2",
            "host": "2",
            "participants": [new ObjectID("000000000000000000000002")],
            "playlist": []
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
