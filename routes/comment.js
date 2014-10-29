module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Comment = mongoose.models.Comment,
      Entry = mongoose.models.Entry,
      api = {};

  // ALL
  api.comments = function (req, res) {
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
    Comment.find(filter)
        .sort({createdAt: "desc"})
        .exec(function(err, comment) {
            Entry.count().exec(function(err, count) {
                if (err)
                  res.json(500, err);

                res.send({
                    comment: comment,
                    meta: {
                      page: page,
                      total_pages: Math.max(1, count / perPage)
                    }
                })
            })
        });
  };


  // GET
  api.comment = function (req, res) {
    var id = req.params.id;
    Comment.findOne({ '_id': id }, function(err, comment) {
      if (err) {
        res.json(404, err);
      } else {
        res.json({comment: comment});
      }
    });
  };

  // POST
  api.addComment = function (req, res) {
    
    var comment;
      
    if(typeof req.body.comment == 'undefined'){
         res.status(500);
         return res.json({message: 'comment is undefined'});
    }

    comment = new Comment(req.body.comment);

    comment.save(function (err) {
      if (!err) {
         console.log("created comment");
         Entry.findOne( { '_id': comment.entry }, function(err, entry) {
            entry.comments.push(comment._id);
            entry.save();
         });
        return res.json(201, {comment: comment.toObject()});
      } else {
        return res.json(500, err);
      }
    });

  };

  // PUT
  api.editComment = function (req, res) {
    var id = req.params.id;

    Comment.findById(id, function (err, comment) {


    
      if(typeof req.body.comment["message"] != 'undefined'){
        comment["message"] = req.body.comment["message"];
      }  
    

      return comment.save(function (err) {
        if (!err) {
          console.log("updated comment");
          return res.json(200, {comment: comment.toObject()});        
        } else {
         return res.json(500, err);
        }
        return res.json({comment: comment});
      });
    });

  };

  // DELETE
  api.deleteComment = function (req, res) {
    var id = req.params.id;
    return Comment.findById(id, function (err, comment) {
      return comment.remove(function (err) {
        if (!err) {
          console.log("removed comment");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/comments', api.comments);
  app.get('/api/comments/:id', api.comment);
  app.post('/api/comments', api.addComment);
  app.put('/api/comments/:id', api.editComment);
  app.delete('/api/comments/:id', api.deleteComment);
};