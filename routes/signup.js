module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Signup = mongoose.models.Signup,
      api = {};

  // ALL
  api.signups = function (req, res) {
    Signup.find(function(err, signups) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json({signups: signups});
      }
    });
  };

  // GET
  api.signup = function (req, res) {
    var id = req.params.id;
    Signup.findOne({ '_id': id }, function(err, signup) {
      if (err) {
        res.json(404, err);
      } else {
        res.json({signup: signup});
      }
    });
  };

  // POST
  api.addSignup = function (req, res) {
    
    var signup;
    console.log("******************");
    console.log(req.body);
      
    if(typeof req.body.signup == 'undefined'){
         res.status(500);
         return res.json({message: 'signup is undefined'});
    }

    signup = new Signup(req.body.signup);

    signup.save(function (err) {
      if (!err) {
        console.log("created signup");
        return res.json(201, signup.toObject());
      } else {
        return res.json(500, err);
      }
    });

  };

  // PUT
  api.editSignup = function (req, res) {
    var id = req.params.id;

    Signup.findById(id, function (err, signup) {


    
      if(typeof req.body.signup["username"] != 'undefined'){
        signup["username"] = req.body.signup["username"];
      }  
    
      if(typeof req.body.signup["email"] != 'undefined'){
        signup["email"] = req.body.signup["email"];
      }  
    
      if(typeof req.body.signup["password"] != 'undefined'){
        signup["password"] = req.body.signup["password"];
      }  
    

      return signup.save(function (err) {
        if (!err) {
          console.log("updated signup");
          return res.json(200, signup.toObject());        
        } else {
         return res.json(500, err);
        }
        return res.json(signup);
      });
    });

  };

  // DELETE
  api.deleteSignup = function (req, res) {
    var id = req.params.id;
    return Signup.findById(id, function (err, signup) {
      return signup.remove(function (err) {
        if (!err) {
          console.log("removed signup");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/signups', api.signups);
  app.get('/api/signup/:id', api.signup);
  app.post('/api/signup', api.addSignup);
  app.put('/api/signup/:id', api.editSignup);
  app.delete('/api/signup/:id', api.deleteSignup);
};