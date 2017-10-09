var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  user : {
    type : String,
    required : true
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

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
  },
  users : [usersSchema],
});

mongoose.model('Topics', topicsSchema);
