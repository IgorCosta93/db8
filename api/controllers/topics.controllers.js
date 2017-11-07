var mongoose  = require('mongoose');
var topics    = mongoose.model('Topics');

module.exports.getAllSubject = function(req,res){
    topics
      .find()
      .exec(function(err, topics){
        console.log(err);
        console.log(topics);
        if(err){
          console.log("Error finding Topics");
          res
            .status(500)
            .json(err);
        }else {
          console.log("Found the topics", topics.length);
          res
            .json(topics);
        }
      });
};

module.exports.getSubject = function(req,res){
  var topic = req.params.topic;
    topics
      .find({
        topic : req.params.topic
      })
      .exec(function(err, topics){
        console.log(err);
        console.log(topics);
        if(err){
          console.log("Error finding Topics");
          res
            .status(500)
            .json(err);
        }else {
          console.log("Found the topics", topics.length);
          res
            .json(topics);
        }
      });
};

module.exports.getAllTopicA = function(req,res){
    var topicTittle = req.params.topic;
    topics
      .find({
        //active     : "SIM",
        //votes      : {$gt: 50},
        topic      : req.params.topic
      })
      .sort({votes:-1})
      .limit(10)
      .exec(function(err, topics){
        console.log(err);
        console.log(topics);
        if(err){
          console.log("Error finding Topics");
          res
            .status(500)
            .json(err);
        }else {
          console.log("Found the topics", topics.length);
          res
            .json(topics);
        }
      });
};

module.exports.getUserVote = function(req,res){
  var topicId = req.params.topicId;
  var userName = req.params.user;
    topics
      .findById(topicId)
      .select('users')
      .exec(function(err, topic){
        var response = {
          status  : 200,
          message : {}
        };
        if (err){
          console.log("Error finding Topic");
          response.status   = 500;
          response.message  = err;
        }else if (!topic) {
          console.log("Topic id not found in database ", id);
          response.status   = 404;
          response.message  = {"message" : "Topic ID not found " + id}
        }else {
          //Get User
          response.message = topic.users ? topic.users : [];
          //If the user doens`t exist Mongoose returns null
          if (!response.message){
            response.status   = 404;
            response.message  = {
              "message" : "User not found " + username
            };
          }
        }
        res
          .status(response.status)
          .json(response.message);
      });
};

module.exports.addTopic = function(req,res){
    topics
      .create({
        topic     : req.body.topic,
        subject   : req.body.subject,
        votes     : 0,
        createdOn : req.body.createdOn,
        active    : "NAO"
      }, function(err, topic){
          if(err){
            console.log("Error creating topic");
            res
              .status(400)
              .json(err);
          }else {
            console.log("Topic Add.", topic);
            res
              .status(201)
              .json(topic);
          }
      });
};

module.exports.updateTopic = function(req,res){
  //console.log(req.body._id);
  topics.findById(req.body._id, (err, topics) => {
    if (err){
      res.status(500).send(err);
    }else{
      topics.votes  = topics.votes + req.body.vote;
      topics.users.push({
        user : req.body.user,
        createdOn : req.body.createdOn
      });
      topics.save((err, topics) => {
        if(err){
          res.status(500).send(err)
          console.log(err);
        }else {
          res.status(200).send(topics)
          console.log(topics);
        }
      });
    }
  });
};

module.exports.updateTopicSujestion = function(req,res){
  console.log(req.body._id);
  topics.findById(req.body._id, (err, topics) => {
    if (err){
      res.status(500).send(err);
    }else{
      topics.topic      = req.body.topic      || topics.topic;
      topics.subject    = req.body.sujestion  || topics.subject;
      topics.votes      = req.body.votes      || topics.votes;
      topics.createdOn  = req.body.createdOn  || topics.createdOn;
      topics.active     = req.body.active     || topics.active;
      topics.save((err, topics) => {
        if(err){
          res.status(500).send(err)
          console.log(err);
        }else {
          res.status(200).send(topics)
          console.log(topics);
        }
      });
    }
  });
};

module.exports.deleteTopic = function(req, res){
  id = req.params.topicId;
  topics
    .findByIdAndRemove(id)
    .exec(function(err, result){
      console.log(err);
      console.log(result);
      if (err){
        console.log("Error deleting Topic");
        res.
          status(500)
          .json(err);
      }else {
        console.log("User delete");
        res
          .json(result);
      }
    });
};
