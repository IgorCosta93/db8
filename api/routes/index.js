var express = require('express');
var router = express.Router();

var ctrlConversation  = require('../controllers/conversation.controllers.js');
var ctrlUsers         = require('../controllers/users.controllers.js');

router
  .route('/topics/politics')
  .get(ctrlConversation.conversationGetAll)
  .post(ctrlConversation.addComent)
  .delete(ctrlConversation.deleteComent);

router
  .route('/topics/politics/:politicsId')
  .delete(ctrlConversation.deleteComent);

// Authentication
router
  .route('/register')
  .post(ctrlUsers.register);

router
  .route('/login')
  .post(ctrlUsers.login);

router
  .route('/user/:username')
  .get(ctrlUsers.getUser);

module.exports = router;
