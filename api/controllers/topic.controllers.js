var mongoose  = require('mongoose');
var topic    = require('Topic');

module.exports.getAllTopic = function(req,res){
  topic
    .find()
    .exec(function(err, topic){
      console.log(err);
      console.log(topic);
      if(err){
        console.log("Error finding Topic");
        res
          .status(500)
          .json(err);
      }else {
        console.log("Found the topic ", topic.length);
        res
          .json(topic);
      }
    });
};
