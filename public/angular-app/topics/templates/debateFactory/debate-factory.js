angular.module('db8').factory('debateFactory', debateFactory);

function debateFactory($http){
  return {
    debateList  : debateList,
    debatePost  : debatePost,
    getUsers    : getUsers,
    getUser     : getUser,
    topicPost   : topicPost,
    updateUser  : updateUser,
    deleteUser  : deleteUser,
    getSubjects : getSubjects,
    updateTopic : updateTopic
  };

  function debateList() {
    return $http.get('/api/topics/politics/').then(complete).catch(failed);
  }

  function debatePost(post){
    return $http.post('/api/topics/politics', post).then(complete).catch(failed);
  }

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

  //------subjects
  function getSubjects(){
    return $http.get('/api/topics').then(complete).catch(failed);
  }

  function updateTopic(topic){
    return $http.post('/api/topics/id', topic).then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
