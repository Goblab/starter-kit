/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');

var path = require('path');
var sass = require('node-sass');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var http = require('http').Server(app);
var io = require('socket.io')(http);

/**
 * Mongoose configuration
 */

mongoose.connect('localhost');
mongoose.connection.on('error', function() {
  console.log('← MongoDB Connection Error →');
});

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


/**
 * User Schema.
 *
 * @type {mongoose.Schema}
 */

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  token: String
});

/**
 * User Schema pre-save hooks.
 * It is used for hashing and salting user's password and token.
 */

userSchema.pre('save', function(next) {
  var user = this;

  var hashContent = user.username + user.password + Date.now() + Math.random();
  user.token = crypto.createHash('sha1').update(hashContent).digest('hex');

  if (!user.isModified('password')) return next();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for comparing user's password input with a
 * hashed and salted password stored in the database.
 */

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};

/**
 * User mongoose model.
 */

var User = mongoose.model('User', userSchema);

/**
 * Entry Schema.
 *
 * @type {mongoose.Schema}
 */

var entrySchema = new mongoose.Schema({
  message:  String,
  createdAt: String,
  author: { type: ObjectId, ref: 'userSchema' },
});

/**
 * Entry mongoose model.
 */
var Entry = mongoose.model('Entry', entrySchema);



/**
 * profile Schema.
 *
 * @type {mongoose.Schema}
 */

var profileSchema = new mongoose.Schema({
  name:  String,
  last_name: String,
  age: Number,
  avatar: String,
  user: { type: ObjectId, ref: 'userSchema' },
});

/**
 * profile mongoose model.
 */
var Profile = mongoose.model('Profile', profileSchema);


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

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, { message: 'Internal Server Error'});
});
app.use(sass.middleware({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Find user by id.
 *
 * @param {string} id
 * @returns {object} user
 */

app.get('/api/users/:id', function(req, res, next) {
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
});

/**
 * Find all Users.
 *
 * @returns {object} Users
 */

app.get('/api/users', function(req, res, next) {
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
});


/**
 * Find entry by id.
 *
 * @param {string} id
 * @returns {object} entry
 */

app.get('/api/entries/:id', function(req, res, next) {
  Entry.findById(req.params.id, function(err, entry) {
    if (err) return next(err);
    res.send({ entry: entry });
  });
});

/**
 * Find all people.
 *
 * @returns {object} person
 */

app.get('/api/entries', function(req, res, next) {
  var perPage = 3;
  var page = Math.max(0, req.param('page'));
  if (!page)
    page = 1;

  var filter =  {};
  for ( var k in req.query ) {

      if (k == "message"){
        filter[k] =  { $regex: req.query[k] };
      } else {
        if (k != "page" && k != "per_page")
          filter[k] = req.query[k];   // probably want to check in the loop
      }
  }

/*  Entry.find(filter, function(err, entry) {
    if (err) return next(err);
    res.send({ entry: entry });
  });
*/
  Entry.find(filter)
      .limit(perPage)
      .skip(perPage * (page -1))
      .sort({
          createdAt: 'desc'
      })
      .exec(function(err, entry) {
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
});


/**
 * Update entry by id.
 *
 * @param {string} id
 * @returns {object} entry
 */

app.put('/api/entries/:id', function(req, res, next) {
  Entry.findByIdAndUpdate(req.params.id, req.body.entry, function(err, entry) {
    if (err) return next(err);
    res.send({ entry: entry });
  });
});

/**
 * Create new entry.
 *
 * @param {object} entry
 * @returns {object} entry
 */

app.post('/api/entries', function(req, res, next) {
  var entry = new Entry(req.body.entry);
  entry.save(function(err) {
    if (err) return next(err);
    res.send({ entry: entry });
  });
});

/**
 * Delete entry by id.
 *
 * @param {string} id
 * @returns 200 OK
 */

app.del('/api/entries/:id', function(req, res, next) {
  Entry.findById(req.params.id).remove(function(err) {
    if (err) return next(err);
    res.send(200);
  });
});


/**
 * Find profile by id.
 *
 * @param {string} id
 * @returns {object} entry
 */

app.get('/api/profiles/:id', function(req, res, next) {
  Profile.findById(req.params.id, function(err, profile) {
    if (err) return next(err);
    res.send({ profile: profile });
  });
});

/**
 * Update profile by id.
 *
 * @param {string} id
 * @returns {object} profile
 */

app.put('/api/profiles/:id', function(req, res, next) {
  Profile.findByIdAndUpdate(req.params.id, req.body.profile, function(err, profile) {
    if (err) return next(err);
    res.send({ profile: profile });
  });
});

/**
 * Create new entry.
 *
 * @param {object} entry
 * @returns {object} entry
 */

app.post('/api/profiles', function(req, res, next) {
  var profile = new Profile(req.body.profile);
  profile.save(function(err) {
    if (err) return next(err);
    res.send({ profile: profile });
  });
});





/**
 * POST /token
 * Sign in using email and password.
 * @param {string} username
 * @param {string} password
 */

app.post('/token', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) return next(err);
    if (user) res.send({ access_token: user.token, user_id: user._id });
    else res.send(404, 'Incorrect username or password.');
  })(req, res, next);
});

/**
 * POST /signup
 * Create a new local account.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} confirmPassword
 */

app.post('/signup', function(req, res, next) {
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
});


app.listen(app.get('port'), function() {
  console.log('Express server running on port ' + app.get('port'));
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});

io.on('connection', function(socket){
  socket.on('newEntry', function(entry) {
    socket.broadcast.emit('new_entry', entry);
  });  
  socket.on('deleteEntry', function(entry) {
    console.log('DELETE_ENTRY');
    socket.broadcast.emit('delete_entry', entry);
  });    
});

