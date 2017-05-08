const express = require('express');
const massive = require('massive');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
// const config = require('./config.js');

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
  connectionString : "postgres://postgres:@localhost:5432/Vubooks"
});

app.set('db', conn);
const db = app.get('db');


///////////auth0 stuff////////////
// console.log(config);


passport.use(new Auth0Strategy({
   domain:       "harryvu.auth0.com",
   clientID:     "JOE8L_mVN5scHzj-umtZwYGE5tO5AYMU",
   clientSecret: "ufPrSFuTNGI20tVmr7TbXS31mEcgfpjM0OJlCxJx8u98Hti2R5qPKl9VpgN2dySb",
   callbackURL:  'http://localhost:3000/auth/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // console.log(profile);
    db.getUserByAuthId([profile.id], function(err, user) {
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
            'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjo2qWA_9_TAhUX7WMKHSTKBrUQjRwIBw&url=https%3A%2F%2Fwww.sportle.tv%2Fprivacy-policy&psig=AFQjCNF0uUQE0PjOnMIT06wc6N_Uf369NQ&ust=1494322416633158',
            profile.id
          ]

        }
        db.createUserByAuth(data, function(err, user) {
          console.log('USER CREATED', user);
          return done(err, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(err, user);
      }
    })
  }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
  console.log('serializing', userA);
  //Things you might do here :
   //Serialize just the id, get other information to add to session,
  done(null, userA); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {

  //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, userB); //PUTS 'USER' ON REQ.USER
});



app.get('/auth', passport.authenticate('auth0'));

//
// **************************
// To force specific provider://
// *************************
// app.get('/login/google',
//   passport.authenticate('auth0', {connection: 'google-oauth2'}), function (req, res) {
//   res.redirect("/");
// });

app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: '/#!/'}), function(req, res) {
    // console.log(req.user);
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res) {
  // console.log(req.user);
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  console.log('at the server')
  req.logout();
  res.redirect('/');
})



////////////////////////////////////////////////////////
//////////////////////ENDPOINTS/////////////////////////
////////////////////////////////////////////////////////



app.get('/api/books', function(req, res) {
  db.get_all_books(function (err, books) {
    res.send(books)
  })
})

app.post('/api/books/isbn', function(req, res) {
  console.log(typeof req.body.isbn, req.body.isbn);
  db.get_books_by_isbn(req.body.isbn, function (err, books) {
    res.send(books)
  })
})

app.post('/api/books', function(req, res) {
  console.log(req.body);
  db.search_books(['%'+req.body.param+'%'], function (err, books) {
    res.send(books)
  })
})

app.post('/api/books/wishlist', function(req, res) {
  console.log(req.body);
  db.addBookToWishlist([req.body.user_id, req.body.book_id], function (err, books) {
    res.send(books)
  })
})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})
