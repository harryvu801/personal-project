const express = require('express');
const massive = require('massive');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const config = require('./config.js');

const app = module.exports = express();
app.use(bodyParser.json());
app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'supersecretsecret'
}))
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname + '/public'));

app.use(cors());

const conn = massive.connectSync({
  connectionString : "postgres://ffpxleit:HZsGTaoYdCj9AoQN7fI1v05dQ0N9D5L0@stampy.db.elephantsql.com:5432/ffpxleit"
});

//

app.set('db', conn);
const db = app.get('db');

////////////////////////////////////////////////////////
//////////////////////ENDPOINTS/////////////////////////
////////////////////////////////////////////////////////



app.get('/api/books', (req, res) =>{
  db.get_all_books( (err, books) =>{
    res.send(books)
  })
})

app.post('/api/books/isbn', (req, res) =>{
  // console.log(typeof req.body.isbn, req.body.isbn);
  db.get_books_by_isbn(req.body.isbn,  (err, books)=> {
    res.send(books)
  })
})

app.post('/api/books', (req, res) =>{
  console.log(req.body);
  db.search_books(['%'+req.body.param+'%'],  (err, books)=> {
    console.log(err);
    res.send(books)
  })
})

app.post('/api/books/wishlist', (req, res) =>{
  console.log(req.body);
  db.addBookToWishlist([req.body.user_id, req.body.book_id],  (err, books)=> {
    res.send(books)
  })
})

app.put('/api/books/wishlist', (req, res) =>{
  console.log(req.body);
  db.removeFromWishlist([req.body.id],  (err, list) =>{
    console.log(err);
  })
})

app.post('/api/books/wishlist/id', (req, res) =>{
  // console.log(req.body);
  db.getWishlist([req.body.id],  (err, list) =>{
    res.send(list)
  })
})

app.post('/api/books/user', (req, res) =>{
  console.log(req.body);
  db.addBookToUserBooks([req.body.user_id, req.body.book_id, , req.body.condition],  (err, books)=> {
    console.log(err);
    res.send(books)
  })
})

app.put('/api/books/user', (req, res) =>{
  console.log(req.body);
  db.removeFromUserBooks([req.body.id],  (err, list)=> {
    console.log(err);
  })
})

app.post('/api/books/user/id', (req, res) =>{
  // console.log(req.body);
  db.getUserBooks([req.body.id],  (err, list)=> {
    res.send(list)
  })
})

app.post('/api/users', (req, res) =>{
  // console.log(req.body);
  db.findUsers([req.body.id],  (err, users)=> {
    res.send(users)
  })
})

app.post('/api/messages', (req, res) =>{
  db.getMessages([req.body.id],  (err, sent) =>{
    db.getMessages2([req.body.id], (err, recv)=> {
      if (sent) {
        res.send(sent.concat(recv));
      }

    })
  });
})


app.post('/api/messages/post', (req, res) =>{
  db.postMessage([req.body.s, req.body.r, req.body.msg],  (err, msg)=> {
    res.send(msg)
  });
})

///////////auth0 stuff////////////
// console.log(config);


passport.use(new Auth0Strategy({
  domain:       config.auth0.domain,
  clientID:     config.auth0.clientID,
  clientSecret: config.auth0.clientSecret,
  callbackURL:  config.auth0.callbackURL
},
(accessToken, refreshToken, extraParams, profile, done) => {
  // console.log(profile);
  db.getUserByAuthId([profile.id], (err, user) =>{
    user = user[0];
    if (!user) { //if there isn't one, we'll create one!
    console.log('CREATING USER');
    if (profile.name.familyName && profile.name.givenName) {
      var data =
      [
        profile.name.givenName,
        profile.name.familyName,
        profile.displayName,
        profile.picture,
        profile.id
      ]

    } else {

      var data =
      [
        profile._json.user_metadata.first_name,
        profile._json.user_metadata.last_name,
        profile.displayName,
        'http://www.fmantra.in/upload/tips/default-prof.png',
        profile.id
      ]

    }
    db.createUserByAuth(data, (err, user) =>{
     console.log("this is the data", data);
	 console.log('USER CREATED', user);
      return done(err, user[0]); // GOES TO SERIALIZE USER
    })
  } else { //when we find the user, return it
    // console.log('FOUND USER', user);
    return done(err, user);
  }
})
}
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser((userA, done) =>{
  // console.log('serializing', userA);
  //Things you might do here :
  //Serialize just the id, get other information to add to session,
  done(null, userA); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser((userB, done)=> {

  //Things you might do here :
  // Query the database with the user id, get other information to put on req.user
  done(null, userB); //PUTS 'USER' ON REQ.USER
});



app.get('/auth', passport.authenticate('auth0'));


app.get('/auth/callback',
passport.authenticate('auth0', {successRedirect: '/#!/'}), (req, res)=> {
  // console.log(req.user);
  res.status(200).send(req.user);
})

app.get('/auth/me', (req, res)=> {
  // console.log(req.user);
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

app.get('/auth/logout', (req, res)=> {
  console.log('at the server')
  req.logout();
  res.redirect('/');
})




app.listen('8083', ()=>{
  console.log("Successfully listening on : 80")
})
