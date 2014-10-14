module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      User = mongoose.models.User,
      api = {};

  // ALL
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
      Profile.findOne({user: req.params.id}, function(err, profile) {
        if (err) return next(err);
        var profileId = null;
        if (profile)
          profileId = profile.id;
        res.send({ user: {
          username: user.username,
          email: user.email,
          _id: user.id,
          profile: profileId,
        }});
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


  app.get('/api/users', api.users);
  app.get('/api/user/:id', api.user);
  app.post('/api/user', api.addUser);
  app.put('/api/user/:id', api.editUser);
  app.delete('/api/user/:id', api.deleteUser);
};