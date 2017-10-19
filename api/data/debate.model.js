var mongoose = require('mongoose');

var userListSchema = new mongoose.Schema({
  user : {
    type : String,
    required : true
  },
  position: {
    type : String,
    required: false
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

var comentsSchema = new mongoose.Schema({
  user : {
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
  }
});

var conversationSchema = new mongoose.Schema({
  topic: {
    type : String,
    required: false
  },
  subject: {
    type : String,
    required: true
  },
  coments : [comentsSchema],
  userLimit: {
    type: Number,
    required: false
  },
  userList: [userListSchema],
  userListN : {
    type : Number,
    required : false
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  },
});

mongoose.model('Conversation', conversationSchema);
