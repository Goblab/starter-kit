module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Entry = mongoose.models.Entry,
      Comment = mongoose.models.Comment,
      api = {};

  // ALL
/*  
  api.entries = function (req, res) {
    Entry.find(function(err, entrys) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json({entrys: entrys});
      }
    });
  };
*/  

  api.entries = function (req, res, next) {
    var perPage = 4;
    var page = Math.max(0, req.param('page'));
    if (!page)
      page = 1;

    var filter =  {};
    for ( var k in req.query ) {
        if (k == "ids") {
          filter['_id'] = { $in: req.query[k]};
        } else {
          if (k == "message"){
            filter[k] =  { $regex: req.query[k] };
          } else {
            if (k != "page" && k != "per_page")
              filter[k] = req.query[k];   // probably want to check in the loop
          }
        }
    }
    Entry.find(filter)
        .sort({
            createdAt: 'desc'
        })
        .exec(function(err, entry) {
            console.log(entry);
            Entry.count().exec(function(err, count) {
                res.send({
                    entry: entry,
                    meta: {
                      page: page,
                      total_pages: Math.max(1, count / perPage)
                    }
                })
            })
        })
  };


  // GET
  api.entry = function (req, res) {
    var id = req.params.id;
    Entry.findOne({ '_id': id }, function(err, entry) {
      if (err) {
        res.json(404, err);
      } else {
        if (entry) {
          res.json({entry: entry});
        } else {
          res.json(404, err);
        }
      }
    });
  };

  // POST
  api.addEntry = function (req, res) {
    
    var entry;
    
    /*
    if(typeof req.body.entry == 'undefined'){
         res.status(500);
         return res.json({message: 'entry is undefined'});
    }
    */

    entry = new Entry(req.body.entry);

    entry.save(function (err) {
      if (!err) {
        console.log("created entry");
        return res.json(201, {entry: entry.toObject()});
      } else {
        return res.json(500, err);
      }
    });

  };

  // PUT
  api.editEntry = function (req, res) {
    var id = req.params.id;

    Entry.findById(id, function (err, entry) {


    
      if(typeof req.body.entry["message"] != 'undefined'){
        entry["message"] = req.body.entry["message"];
      }  
    
      if(typeof req.body.entry["createdAt"] != 'undefined'){
        entry["createdAt"] = req.body.entry["createdAt"];
      }  
    
      if(typeof req.body.entry["author"] != 'undefined'){
        entry["author"] = req.body.entry["author"];
      }  
    

      return entry.save(function (err) {
        if (!err) {
          console.log("updated entry");
          return res.json(200, {entry: entry.toObject()});        
        } else {
         return res.json(500, err);
        }
        return res.json({entry: entry});
      });
    });

  };

  // DELETE
  api.deleteEntry = function (req, res) {
    var id = req.params.id;
    return Entry.findById(id, function (err, entry) {
      return entry.remove(function (err) {
        if (!err) {
          console.log("removed entry");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/entries', api.entries);
  app.get('/api/entries/:id', api.entry);
  app.post('/api/entries', api.addEntry);
  app.put('/api/entries/:id', api.editEntry);
  app.delete('/api/entries/:id', api.deleteEntry);
};