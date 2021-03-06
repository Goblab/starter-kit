module.exports = function(app) {
  // Module dependencies.
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  
  var mongoose = require('mongoose'),
      User = mongoose.models.User,
      Profile = mongoose.models.Profile,
      Entry = mongoose.models.Entry,
      api = {};

  // ALL

/**
 * Passport setup.
 */

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false);
    });
  });
}));

  /*
   // Codigo de Mongoose Generator
  api.users = function (req, res) {
    User.find(function(err, users) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json({users: users});
      }
    });
  };
  */

  api.users = function (req, res, next) {
    var filter =  {};
    for ( var k in req.query ) {
        if (typeof(req.query[k]) == "string") {
          filter[k] =  { $regex: req.query[k] };
        } else {
          filter[k] = req.query[k];   // probably want to check in the loop
        }
    }
    
    User.find(filter, function(err, user) {
      if (err) return next(err);
      res.send({ user: user });
    });
  };

  // GET
  /*
  // Codigo de Mongoose Generator
  api.user = function (req, res) {
    var id = req.params.id;
    User.findOne({ '_id': id }, function(err, user) {
      if (err) {
        res.json(404, err);
      } else {
        res.json({user: user});
      }
    });
  };
  */

  api.user = function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (err) return next(err);
      Entry.find({author: req.params.id}, function(err, entries) {
        if (err) return next(err);
        var entriesArr = [];
        entries.forEach(function (entry) {
          entriesArr.push(entry.id);
        });
        Profile.findOne({user: req.params.id}, function(err, profile) {
          if (err) return next(err);
          var profileId = null;
          var username = null;
          var email = null;
          var userId = null;
          if (profile)
            profileId = profile.id;
          if (user) {
            username = user.username;
            email = user.email;
            userId = user.id;
          } else {
            return next(err);
          }
          res.send({ user: {
            username: username,
            email: email,
            _id: userId,
            profile: profileId,
            entries: entriesArr
          }
        }
          );
        });    
      });
    });
  };

  // POST
  api.addUser = function (req, res) {
    
    var user;
      
    if(typeof req.body.user == 'undefined'){
         res.status(500);
         return res.json({message: 'user is undefined'});
    }

    user = new User(req.body.user);

    user.save(function (err) {
      if (!err) {
        console.log("created user");
        return res.json(201, user.toObject());
      } else {
        return res.json(500, err);
      }
    });

  };

  // PUT
  api.editUser = function (req, res) {
    var id = req.params.id;

    User.findById(id, function (err, user) {


    
      if(typeof req.body.user["username"] != 'undefined'){
        user["username"] = req.body.user["username"];
      }  
    
      if(typeof req.body.user["email"] != 'undefined'){
        user["email"] = req.body.user["email"];
      }  
    
      if(typeof req.body.user["password"] != 'undefined'){
        user["password"] = req.body.user["password"];
      }  
    
      if(typeof req.body.user["token"] != 'undefined'){
        user["token"] = req.body.user["token"];
      }  
    

      return user.save(function (err) {
        if (!err) {
          console.log("updated user");
          return res.json(200, user.toObject());        
        } else {
         return res.json(500, err);
        }
        return res.json(user);
      });
    });

  };

  // DELETE
  api.deleteUser = function (req, res) {
    var id = req.params.id;
    return User.findById(id, function (err, user) {
      return user.remove(function (err) {
        if (!err) {
          console.log("removed user");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };
  // POST
  api.addSignup = function (req, res) {
    console.log(req.is('json'));
    if (!req.body.username) {
      return res.send(400, 'Username cannot be blank.');
    }

    if (!req.body.email) {
      return res.send(400, 'Email cannot be blank.');
    }

    if (!req.body.password) {
      return res.send(400, 'Password cannot be blank.');
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send(400, 'Passwords do not match.');
    }

    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    user.save(function(err) {
      if (err) return res.send(500, err.message);
      res.send(200);
    });
  };

  app.post('/token', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
      if (err) return next(err);
      if (user) res.send({ access_token: user.token, user_id: user._id });
      else res.json(400,  {error:"invalid_request", error_description:"Incorrect username or password."});
      
    })(req, res, next);
  });


  app.post('/signup', api.addSignup);

  app.get('/api/users', api.users);
  app.get('/api/users/:id', api.user);
  app.post('/api/users', api.addUser);
  app.put('/api/users/:id', api.editUser);
  app.delete('/api/users/:id', api.deleteUser);
};