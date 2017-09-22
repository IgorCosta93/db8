var mongoose = require('mongoose');
var User     = mongoose.model('User');
var bcrypt   = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');

module.exports.register = function(req, res) {
  console.log('registering user');

  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var adm = req.body.adm || "NAO";

  User.create({
    username  : username,
    password  : bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    email     : email,
    adm       : adm
  }, function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('user created', user);
      res.status(201).json(user);
    }
  });
};

module.exports.login = function(req, res) {
  console.log('logging in user');
  var usuario  = req.body.username;
  var password  = req.body.password;
  var sta = '';
  /*User
    .findOne({username:usuario})
    .exec(function(err, doc){
      if (err){
        console.log(err);
      }else {
        console.log(doc.username);
        console.log(doc.password);
      }
    });*/

  User.findOne({
    username: usuario
  }).exec(function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    }else if (!user){
      console.log("User not found.");
      res.status(404).json('Unauthorized');
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        console.log('User found', user);
        var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 });
        res.status(200).json({success: true, token: token});
      } else {
        res.status(401).json('Unauthorized');
      }
    }
  });
};

module.exports.getUsers = function(req,res){
    User
      .find()
      .exec(function(err, users){
          if(err){
            console.log("Error finding users");
            res
              .status(500)
              .json(err);
          }else {
            console.log("Found users ", users.length);
            res
              .json(users);
          }
      });
};

module.exports.getUser = function(req, res) {
  console.log('User found ' + req.params.username);
  var usuario  = req.params.username;

  User.findOne({
    username : usuario
  }).exec(function(err, user){
    var response = {
      status  : 200,
      message : user
    };
    if (err){
      console.log("Error finding user");
      response.status   = 500;
      response.message  = err;
    }else if (!user) {
      console.log("User not found in the database");
      response.status = 404;
      response.message = {
        "message" : "User not found " + usuario
      };
    }
    res
      .status(response.status)
      .json(response.message);
  });

};


module.exports.authenticate = function(req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
    jwt.verify(token, 's3cr3t', function(error, decoded) {
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.username;
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};

module.exports.alert = function(){

};
