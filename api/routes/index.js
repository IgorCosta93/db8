var express = require('express');
var router = express.Router();

var ctrlConversation  = require('../controllers/conversation.controllers.js');
var ctrlUsers         = require('../controllers/users.controllers.js');
var ctrlTopic         = require('../controllers/topics.controllers.js');
var ctrlTopics        = require('../controllers/topic.controllers.js');

//-------------------CONVERSATIONS----------------------------

router
  .route('/topics/politics/:id')
  .get(ctrlConversation.conversationGetAll)
  .post(ctrlConversation.addComent)
  .delete(ctrlConversation.deleteComent);

router
  .route('/topics/politics/debate/:id')
  .delete(ctrlConversation.deleteConversation);

router
  .route('/topics/politics/')
  .post(ctrlConversation.addComent);

router
  .route('/topics/politics/:idDebate/idComent/:idComent')
  .delete(ctrlConversation.deleteComent);

router
  //.route('/topics/:people/position/:position/topic/:topic/subject/:subject')
  .route('/topics/search/')
  .post(ctrlConversation.getSearch);

router
  .route('/topics/user/:id')
  .get(ctrlConversation.getSearchUser);

router
  .route('/topics/position/:position')
  .get(ctrlConversation.getSearchPosition);

router
  .route('/topics/debates/')
  .get(ctrlConversation.getDebate);

router
  .route('/topics/debates/:user')
  .get(ctrlConversation.getDebates);

router
  .route('/topics/user/')
  .post(ctrlConversation.addUserInDebate);

router
  .route('/topics/chat')
  .post(ctrlConversation.addConversation);

router
  .route('/topics/politics/:politicsId')
  .delete(ctrlConversation.deleteComent);

/*router
  .route('/topics/politics/update')
  .post(ctrlConversation.updateComent);*/

router
  .route('/topics/conversation/')
  .post(ctrlConversation.updateComent);
/*
router
  .route('/topics/conversations/')
  .post(ctrlConversation.updateComents);*/

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

//---------------TOPICS - SUBJECT----------------------
router
  .route('/topics')
  .get(ctrlTopic.getAllSubject)
  .post(ctrlTopic.addTopic);

router
  .route('/topics/vote/:topic')
  .get(ctrlTopic.getSubject);

router
  .route('/topics/availeble/:topic')
  .get(ctrlTopic.getAllTopicA);

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

//---------------TOPIC----------------------
router
  .route('/topics/menu')
  .get(ctrlTopics.getAll)
  .post(ctrlTopics.addTopic);

module.exports = router;
