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
            .json(topics);
        }
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
  topics.findById(req.body._id, (err, topics) => {
    if (err){
      res.status(500).send(err);
    }else{
      topics.votes  = topics.votes + 1;
      topics.save((err, topics) => {
        if(err){
          res.status(500).send(err)
          console.log(err);
        }else {
          res.status(200).send(topics)
        }
      });
    }
  });
};
