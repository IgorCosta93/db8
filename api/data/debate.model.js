var mongoose = require('mongoose');

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
  }
});

mongoose.model('Conversation', conversationSchema);
