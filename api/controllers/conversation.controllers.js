var mongoose      = require('mongoose');
var conversation  = mongoose.model('User');
var coment        = mongoose.model('Conversation');

module.exports.conversationGetAll = function(req, res){
    //console.log('Request by: ' + req.user);
    //console.log('GET the hotels');
    //console.log('req.query');

    var offset    = 0;
    var count     = 5;
    var maxCount  = 50;

    if (req.query && req.query.offset){
      offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count){
      count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
      res
        .status(400)
        .json({
          "message" : "If supplied in querystring, count and offset must both be numbers"
        });
        return;
    }

    if (count > maxCount){
      res
        .status(400)
        .json({
          "message" : "Count limit of " + maxCount + " exceeded"
        });
        return;
    }

    coment
      .find()
      .exec(function(err, debates){
        //console.log(err);
        //console.log(debates);
        if (err){
          console.log("Error finding debates");
          res
            .status(500)
            .json(err);
        } else {
          console.log("Found a debate ", debates.length);
          res
            .json(debates);
        }
      });

};

module.exports.addComent = function(req,res){
    console.log("Post new coment.");

    coment
      .create({
        subject   : req.body.subject,
        user      : req.body.user,
        coment    : req.body.coment,
        createdOn : req.body.createdOn
      }, function(err, coment){
        if (err) {
          console.log("Error creating coment");
          res
            .status(400)
            .json(err);
        } else {
          console.log("Coment Add.", coment);
          res
            .status(201)
            .json(coment);
        }
      });
};

module.exports.updateComent = function(req,res){
    console.log("COMENT ID "+req.body._id);
    coment.findById(req.body._id, (err, coment) =>{
      if (err){
        res.status(500).send(err);
      }else {
        coment.subject    = req.body.subject    || coment.subject;
        coment.user       = req.body.user       || coment.user;
        coment.coment     = req.body.coment     || coment.coment;
        coment.createdOn  = req.body.createdOn  || coment.createdOn;
        coment.save((err, coment) =>{
            if(err){
              res.status(500).send(err)
            }else {
              res.status(200).send(coment)
            }
        });
      }
    });
};

module.exports.deleteComent = function(req,res){
  id = req.params.politicsId;
  console.log("ID from controller "+id);
  coment
    .findByIdAndRemove(id)
    .exec(function(err, result){
      console.log(err);
      console.log(result);
      if (err){
        console.log("Error deleting coment");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Coment delete");
        res
          .json(result);
      }
    });
};

module.exports.getSearch = function(req,res){
  //console.log("People "+ req.params.people);
  //console.log("Position "+ req.params.position);

  coment
    .find({
      topic     : req.params.topic,
      subject   : req.params.subject,
      //RETURNS A VALUE SMALL THAN PASS  $gt is for Gratter than
      userLimit : req.params.people,
      userListN : {$lt: req.params.people+1}
    })
    .exec(function(err, debates){
      if (err){
        console.log("Error finding debates");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found a debate ", debates.length);
        res
          .json(debates);
      }
    });
};

module.exports.getSearchUser = function(req,res){
  //console.log("People "+ req.params.people);
  //console.log("Position "+ req.params.position);
  var debateId = req.params.id;

  coment
    .findById(debateId)
    .select("userList")
    .exec(function(err, debates){
      var response = {
        status  : 200,
        message : {}
      };
      if (err){
        console.log("Error finding Debate");
        response.status   = 500;
        response.message  = err;
      }else if (!debates) {
        console.log("Debate not found in database ");
        response.status   = 404;
        response.message  = {"message" : "Debate ID not found "}
      }else {
        response.message = debates.userList ? debates.userList : [];
        if(!response.message){
          response.status   = 404;
          response.message  = {
            "message" : "User not found "
          };
        }
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

module.exports.addConversation = function(req,res){
    console.log("Post new coment.");

    coment
      .create({
        topic     : req.body.topic,
        subject   : req.body.subject,
        userLimit : req.body.userLimit,
        userList : {
          user      : req.body.user,
          position  : req.body.position,
          createdOn : req.body.createdOn
        },
        userListN : 1,
        createdOn : req.body.createdOn
      }, function(err, conversation){
        if (err) {
          console.log("Error creating coment");
          res
            .status(400)
            .json(err);
        } else {
          console.log("Coment Add.", conversation);
          res
            .status(201)
            .json(conversation);
        }
      });
};

module.exports.addUserInDebate = function(req,res){

  coment.findById(req.body._id, (err, coments) => {
      if(err){
        res.status(500).send(err);
      }else {
        coments.userListN = coments.userListN + 1;
        coments.userList.push({
          user      : req.body.user,
          position  : req.body.position,
          createdOn : req.body.createdOn
        });
        coments.save((err, coments) => {
          if(err){
            res.status(500).send(err)
            console.log(err);
          }else {
            res.status(200).send(coments)
            console.log(coments);
          }
        });
      }
    });
};
