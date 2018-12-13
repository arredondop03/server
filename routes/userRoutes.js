const express                 = require('express');
const userRoutes              = express.Router();
const User                    = require('../models/user')
//===========================================>
const bcrypt                  = require('bcryptjs')
const session                 = require('express-session')
const passport                = require('passport')
const LocalStrategy           = require('passport-local').Strategy;
const flash                   = require('connect-flash');
const ensureLoggedIn          = require('connect-ensure-login').ensureLoggedIn;
//===========================================>

//SIGN UP
userRoutes.post('/signup', (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const addressStreet = req.body.addressStreet;
  const addressContinued = req.body.addressContinued;
  const city = req.body.city;
  const zipCode = req.body.zipCode;
  const terms = req.body.terms;
  const state = req.body.state;
  const familyName = req.body.familyName;


  if (!username || !password) {
      res.json({ message: 'Provide username and password' });
      return;
  } //closed
//   if (password.length <= 7) {
//       res.status(400).json({ message: 'Please make your password longer' });
//       return;
//   } //closed

  User.findOne({ username }, '_id', (err, foundUser) => {
      if (foundUser) {
          res.json({ message: 'The username already exists' });
          return;
      } //closed
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      const theUser = new User({
          username: username,
          password: hashPass,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          addressStreet: addressStreet,
          addressContinued: addressContinued,
          city: city,
          zipCode: zipCode,
          terms: terms,
          state: state,
          familyName: familyName
      }); //closed

      console.log(theUser);

      theUser.save((err) => {
          if (err) {
              console.log(err.message)
              res.json({ message: err.message });
              return;
          } //closed

          
          req.logIn(theUser, (err) => {
              if (err) {
                  res.status(500).json({ message: 'Something went wrong' });
                  return;
              } //closed

              res.status(200).json(theUser);
          }); //req.login
      }); //theUser.save 
  }); // User.findOne
}); // userRoutes.post

//UPDATE USER
userRoutes.post('/user/update', /*ensureLoggedIn('/'),*/ (req, res, next) => {
  const userId = req.user.id;
  const salt = bcrypt.genSaltSync(10);
  const password = req.body.password;
  const hashPass = bcrypt.hashSync(password, salt);
  User.findByIdAndUpdate(userId, {
      username: req.body.username,
      password: hashPass,
      // name: req.body.name,
      // image: req.body.image, 
      // description: req.body.description,
      // role: req.body.role,
      // stats: req.body.stats,
      
  })
      .then((response) => {
          console.log(response)
          res.json(response)
      })
      .catch((err) => {
          next(err);
      })
})

//DELETE USER
userRoutes.post('/user/delete', /*ensureLoggedIn('/'),*/(req, res, next) => {
  const userId = req.params.id;
  User.findByIdAndRemove(userId)
      .then((response) => { // look into difference between promises and callbacks*
          res.json(response)
      })
      .catch((err) => {
          next(err);
      })
})

//LOGIN
userRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      console.log('user: ', theUser)
      if (err) {
          console.log("hi");
          res.status(500).json({ message: 'Something went wrong' });
          return;
      }
      if (!theUser) {
          res.status(401).json(failureDetails);
          return;
      }
      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Something went wrong' });
              return;
          }
          // We are now logged in (notice req.user)
          res.status(200).json(req.user);
      });  // closed login
  })(req, res, next); // closed passport.authenticate
}); //user login

//Get PROFILE

userRoutes.get('/profile/:id', /*ensureLoggedIn('/'),*/(req, res, next) => {
  const theId = req.params.id
  User.findById(theId)
  // .populate('tournaments')
  // .populate('tournamentAdminOf')
  // .populate('teamCaptainOf')
  // .populate('teamMemberOf')
  .then((theUser)=>{
    res.json(theUser)
  })
  .catch((err)=>{
    res.json(err);
  })
  
});

//Check LOGIN
userRoutes.get('/loggedin', /*ensureLoggedIn('/'),*/(req, res, next) => {
  console.log('Who is logged in: ', req.user)
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
}); // loggedin closed



//LOGOUT 
userRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});

module.exports = userRoutes;