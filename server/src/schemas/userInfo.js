{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "userId": {
      "type": "integer"
    },
    "lastname": {
      "type": "string"
    },
    "firstname": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "avatar": {
      "type": "string"
    },
    "country": {
      "type": "string"
    },
    "dob": {
      "type": "string"
    },
    "playlists": {
      "type": "object"
    }
  },
  "required": [
    "userId",
    "lastname",
    "firstname",
    "country",
    "dob",
    "avatar",
    "email"
  ]
}
