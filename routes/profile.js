module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Profile = mongoose.models.Profile,
      api = {};

  // ALL
  api.profiles = function (req, res) {
    Profile.find(function(err, profiles) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json({profiles: profiles});
      }
    });
  };

  // GET
  api.profile = function (req, res) {
    var id = req.params.id;
    Profile.findOne({ '_id': id }, function(err, profile) {
      if (err) {
        res.json(404, err);
      } else {
        res.json({profile: profile});
      }
    });
  };

  // POST
  api.addProfile = function (req, res) {
    
    var profile;
      
    if(typeof req.body.profile == 'undefined'){
         res.status(500);
         return res.json({message: 'profile is undefined'});
    }

    profile = new Profile(req.body.profile);

    profile.save(function (err) {
      if (!err) {
        console.log("created profile");
        return res.json(201, profile.toObject());
      } else {
        return res.json(500, err);
      }
    });

  };

  // PUT
  api.editProfile = function (req, res) {
    var id = req.params.id;

    Profile.findById(id, function (err, profile) {


    
      if(typeof req.body.profile["name"] != 'undefined'){
        profile["name"] = req.body.profile["name"];
      }  
    
      if(typeof req.body.profile["lastName"] != 'undefined'){
        profile["lastName"] = req.body.profile["lastName"];
      }  
    
      if(typeof req.body.profile["age"] != 'undefined'){
        profile["age"] = req.body.profile["age"];
      }  
    
      if(typeof req.body.profile["avatar"] != 'undefined'){
        profile["avatar"] = req.body.profile["avatar"];
      }  
    
      if(typeof req.body.profile["user"] != 'undefined'){
        profile["user"] = req.body.profile["user"];
      }  
    

      return profile.save(function (err) {
        if (!err) {
          console.log("updated profile");
          return res.json(200, profile.toObject());        
        } else {
         return res.json(500, err);
        }
        return res.json(profile);
      });
    });

  };

  // DELETE
  api.deleteProfile = function (req, res) {
    var id = req.params.id;
    return Profile.findById(id, function (err, profile) {
      return profile.remove(function (err) {
        if (!err) {
          console.log("removed profile");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/profiles', api.profiles);
  app.get('/api/profile/:id', api.profile);
  app.post('/api/profile', api.addProfile);
  app.put('/api/profile/:id', api.editProfile);
  app.delete('/api/profile/:id', api.deleteProfile);
};