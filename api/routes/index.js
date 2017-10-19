var express = require('express');
var router = express.Router();

var ctrlConversation  = require('../controllers/conversation.controllers.js');
var ctrlUsers         = require('../controllers/users.controllers.js');
var ctrlTopic         = require('../controllers/topics.controllers.js');

//-------------------CONVERSATIONS----------------------------

router
  .route('/topics/politics')
  .get(ctrlConversation.conversationGetAll)
  .post(ctrlConversation.addComent)
  .delete(ctrlConversation.deleteComent);

router
  .route('/topics/:people/position/:position')
  .get(ctrlConversation.getSearch);

router
  .route('/topics/chat')
  .post(ctrlConversation.addConversation);

router
  .route('/topics/politics/:politicsId')
  .delete(ctrlConversation.deleteComent);

router
  .route('/topics/politics/update')
  .post(ctrlConversation.updateComent);

//----------------------------------------------------

// Authentication
router
  .route('/register')
  .post(ctrlUsers.register);

router
  .route('/login')
  .post(ctrlUsers.login);

router
  .route('/users')
  .get(ctrlUsers.getUsers);

router
  .route('/user')
  .post(ctrlUsers.updateUser);

router
  .route('/user/:userId')
  .delete(ctrlUsers.deleteUser);

router
  .route('/user/:username')
  .get(ctrlUsers.getUser);

//---------------TOPICS----------------------
router
  .route('/topics')
  .get(ctrlTopic.getAllTopic)
  .post(ctrlTopic.addTopic);

router
  .route('/topics/:topicId/user/:user')
  .get(ctrlTopic.getUserVote);

router
  .route('/topics/id')
  .post(ctrlTopic.updateTopic);

router
  .route('/topics/topic')
  .post(ctrlTopic.updateTopicSujestion);

router
  .route('/topics/:topicId')
  .delete(ctrlTopic.deleteTopic);

module.exports = router;
