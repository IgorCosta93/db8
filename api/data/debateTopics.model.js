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
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

mongoose.model('Topics', topicsSchema);
