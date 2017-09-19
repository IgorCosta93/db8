var express = require('express');
var router = express.Router();

var ctrlConversation  = require('../controllers/conversation.controllers.js');
var ctrlUsers         = require('../controllers/users.controllers.js');

router
  .route('/topics/politics')
  .get(ctrlConversation.conversationGetAll)
  .post(ctrlConversation.addComent);

// Authentication
router
  .route('/register')
  .post(ctrlUsers.register);

router
  .route('/login')
  .post(ctrlUsers.login);

module.exports = router;
