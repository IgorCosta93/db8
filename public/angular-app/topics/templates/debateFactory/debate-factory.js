angular.module('db8').factory('debateFactory', debateFactory);

function debateFactory($http){
  return {
    debateList      : debateList,
    debatePost      : debatePost,
    getUsers        : getUsers,
    getUser         : getUser,
    topicPost       : topicPost,
    updateUser      : updateUser,
    deleteUser      : deleteUser,
    getSubjects     : getSubjects,
    updateTopic     : updateTopic,
    updateSujestion : updateSujestion,
    deleteTopic     : deleteTopic,
    updateDebate    : updateDebate,
    deleteDebate    : deleteDebate
  };

//------------CONVERSATIONS---------------------------------------------

  function debateList() {
    return $http.get('/api/topics/politics/').then(complete).catch(failed);
  }

  function debatePost(post){
    return $http.post('/api/topics/politics', post).then(complete).catch(failed);
  }

  function updateDebate(conversation){
    return $http.post('/api/topics/politics/update', conversation).then(complete).catch(failed);
  }

  function deleteDebate(_id){
    return $http.delete('/api/topics/politics/' + _id).then(complete).catch(failed);
  }
//----------------------------------------------------------------------

  function topicPost(post){
    return $http.post('/api/topics', post).then(complete).catch(failed);
  }

  function getUsers(){
    return $http.get('/api/users').then(complete).catch(failed);
  }

  function getUser(username){
    return $http.get('/api/user/' + username).then(complete).catch(failed);
  }

  function updateUser(usuario){
    return $http.post('/api/user/', usuario).then(complete).catch(failed);
  }

  function deleteUser(_id){
    return $http.delete('/api/user/' + _id).then(complete).catch(failed);
  }

  //------SUJESTIONS---------------------------------------------------------------------------

  function getSubjects(){
    return $http.get('/api/topics').then(complete).catch(failed);
  }

  function updateTopic(id){
    return $http.post('/api/topics/id', id).then(complete).catch(failed);
  }

  function updateSujestion(topic){
    return $http.post('/api/topics/topic', topic).then(complete).catch(failed);
  }

  function deleteTopic(_id){
    return $http.delete('/api/topics/' + _id).then(complete).catch(failed);
  }

    //----------------------------------------------------------------------------------------

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
