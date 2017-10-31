var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
  topic : {
    type      : String,
    required  : true
  },
  user : {
    type : String,
    required : false
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

mongoose.model('Topic', topicSchema);
