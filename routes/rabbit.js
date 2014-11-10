module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Rabbit = mongoose.models.Rabbit,
      api = {};

  // ALL
  api.rabbits = function (req, res) {
    Rabbit.find(function(err, rabbits) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json({rabbits: rabbits});
      }
    });
  };

  // GET
  api.rabbit = function (req, res) {
    var id = req.params.id;
    Rabbit.findOne({ '_id': id }, function(err, rabbit) {
      if (err) {
        res.json(404, err);
      } else {
        res.json({rabbit: rabbit});
      }
    });
  };

  // POST
  api.addRabbit = function (req, res) {
    
    var rabbit;
      
    if(typeof req.body.rabbit == 'undefined'){
         res.status(500);
         return res.json({message: 'rabbit is undefined'});
    }

    rabbit = new Rabbit(req.body.rabbit);

    rabbit.save(function (err) {
      if (!err) {
        console.log("created rabbit");
        return res.json(201, {rabbit: rabbit.toObject()});
      } else {
        return res.json(500, err);
      }
    });

  };

  // PUT
  api.editRabbit = function (req, res) {
    var id = req.params.id;

    Rabbit.findById(id, function (err, rabbit) {


    
      if(typeof req.body.rabbit["name"] != 'undefined'){
        rabbit["name"] = req.body.rabbit["name"];
      }  
    

      return rabbit.save(function (err) {
        if (!err) {
          console.log("updated rabbit");
          return res.json(200, {rabbit: rabbit.toObject()});        
        } else {
         return res.json(500, err);
        }
        return res.json({rabbit: rabbit});
      });
    });

  };

  // DELETE
  api.deleteRabbit = function (req, res) {
    var id = req.params.id;
    return Rabbit.findById(id, function (err, rabbit) {
      return rabbit.remove(function (err) {
        if (!err) {
          console.log("removed rabbit");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/rabbits', api.rabbits);
  app.get('/api/rabbits/:id', api.rabbit);
  app.post('/api/rabbits', api.addRabbit);
  app.put('/api/rabbits/:id', api.editRabbit);
  app.delete('/api/rabbits/:id', api.deleteRabbit);
};