// Payload

payload = {
  iss: 'https://securetoken.google.com/socialapp-foyez',
  aud: 'socialapp-foyez',
  auth_time: 1587713776,
  user_id: 'T9uoc8hMPy7IQL90t3eWItYF3',
  sub: 'Tmmc9uoc8hMPy90t3eWItYF3',
  iat: 1587713776,
  exp: 1587717376,
  email: 'rafeh@email.com',
  email_verified: false,
  firebase: { identities: { email: [Array] }, sign_in_provider: 'password' },
  uid: 'Tmmc9uoc8hMPyL90t3eWItYF3',
  username: 'rafeh',
}

//  GET http://localhost:5000/socialapp-foyez/us-central1/api/screams

getScreams = [
  {
    id: 'eS1bxpON3xE5tmfeBMXu',
    username: 'user',
    body: 'second scream',
    likeCount: 5,
    commentCount: 2,
    createdAt: '2020-04-21T09:47:23.745Z',
  },
]

//  GET http://localhost:5000/socialapp-foyez/us-central1/api/screams/:screamId

getScream = {
  id: 'eS1bxpON3xE5tmfeBMXu',
  username: 'user',
  body: 'second scream',
  likeCount: 5,
  commentCount: 2,
  createdAt: '2020-04-21T09:47:23.745Z',
}

// POST http://localhost:5000/socialapp-foyez/us-central1/api/screams

createScream = {
  username: 'user',
  body: 'second scream',
}

// GET http://localhost:5000/socialapp-foyez/us-central1/api/users

getUsers = [
  {
    userId: 'dh23ggj5h32g543j5gf43',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2019-03-15T10:59:52.798Z',
    imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
    bio: 'Hello, my name is user, nice to meet you',
    website: 'https://user.com',
    location: 'Lonodn, UK',
  },
]

// POST http://localhost:5000/socialapp-foyez/us-central1/api/users

{
  token: 'hfosyr8wy8w9hsfes'
}

// POST http://localhost:5000/socialapp-foyez/us-central1/api/users/login

{
  token: 'hfosyr8wy8w9hsfes'
}

// GET http://localhost:5000/socialapp-foyez/us-central1/api/user
getUser = {
  credentials: {
    userId: '',
    email: 'user@email.com',
    username: 'user',
    createdAt: '2020-04-21T09:47:23.745Z',
    imageUrl: '',
    bio: '',
    website: '',
    location: 'Cumilla, BD',
  },
  likes: [
    {
      username: 'user',
      screamId: 'f8e7sywy8wy8s',
    },
    {
      username: 'user',
      screamId: 'f8e7sywy8wy8s',
    },
  ],
}

// GET http://localhost:5000/socialapp-foyez/us-central1/api/:screamId/:commentId
getComments: [
  {
    username: 'user',
    screamId: 'kdjsfgdksuufhgkdsufky',
    body: 'nice one mate!',
    createdAt: '2019-03-15T10:59:52.798Z',
  },
]

// Error Response

errorRes = {
  errors: {
    message: 'Unauthorized',
  },
}
