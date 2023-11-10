const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.JSON_WEB_TOKEN_SECRET;
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req }) {

    let token = req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;

    return req;
    
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

// {
//   "photo": {
//     "title": "The title",
//     "description": "fbaeifsdbv",
//     "imagelink": "vsjgvbuzgbdvibies"
//   }
// }


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY1NGQ3MmIwNjgzNTczOGIyYjMyYTQzYSIsImVtYWlsIjoidXNlckBnaGhrLmNvbSIsInVzZXJuYW1lIjoidXNlciIsInBhc3N3b3JkIjoiJDJiJDEwJG03WkUuZWEuZmZNbzZSZEFYeUV4aXVpb0pybk0vd1BVdlpZYzNsZENUZ2pESERlalRLRHVhIn0sImlhdCI6MTY5OTU3NDQ0OH0.AmdQBPD2oEs-18FSVXjrKxP3dAOTKakSiWESVM5VR8c