var mongoose = require('mongoose');

var topicsSchema = new mongoose.Schema({
  topic: {
    type : String,
    required: true
  },
  subject: {
    type : String,
    required : true
  },
  votes: {
    type : Number,
    required : false
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  },
  active: {
    type : String,
    required : false
  }
});

mongoose.model('Topics', topicsSchema);
