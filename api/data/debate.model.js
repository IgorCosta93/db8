var mongoose = require('mongoose');

var userLimitSchema = new mongoose.Schema({
  user : {
    type : String,
    required : true
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

var conversationSchema = new mongoose.Schema({
  subject: {
    type : String,
    required: true
  },
  user: {
    type : String,
    required : true
  },
  coment: {
    type : String,
    required : true
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  },
  topic: {
    type : String,
    required: false
  },
  position: {
    type : String,
    required: false
  },
  userLimit: {
    type: Number,
    required: false
  },
  userList: [userLimitSchema]
});

mongoose.model('Conversation', conversationSchema);
