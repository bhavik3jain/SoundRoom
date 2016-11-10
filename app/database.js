import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "SoundRoom";

// Put your mock objects here, as in Workshop 4
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
          "playlists": {
              "Beach Songs": ["Song1", "Song2", "Song3", "Song4", "Song5"],
              "Rock N Roll":["Song6", "Song7"],
              "Party": ["Song8", "Song9"],
              "Hip Hop": ["Drake Songs", "Kayne Songs", "Some rapper"]
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
            "playlists": {
                "Drake Playlists": ["Song1", "Song2", "Song3", "Song4", "Song5"],
                "Logic Playlists (Awesome)":["Song6", "Song7"]
            }
        }
    }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
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
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
// class ResetDatabase extends React.Component {
//   render() {
//     return (
//       <button className="btn btn-default" type="button" onClick={() => {
//         resetDatabase();
//         window.alert("Database reset! Refreshing the page now...");
//         document.location.reload(false);
//       }}>Reset Mock DB</button>
//     );
//   }
// }
//
// ReactDOM.render(
//   <ResetDatabase />,
//   document.getElementById('db-reset')
// );
