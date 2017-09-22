var mongoose      = require('mongoose');
var topics  = mongoose.model('Topics');

module.exports.getAllTopic = function(req,res){
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
            .json(topicss);
        }
      });
};

module.exports.addTopic = function(req,res){
    topics
      .create({
        topic     : req.body.topic,
        subject   : req.body.subject,
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
