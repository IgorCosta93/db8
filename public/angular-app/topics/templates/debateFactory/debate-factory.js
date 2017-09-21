angular.module('db8').factory('debateFactory', debateFactory);

function debateFactory($http){
  return {
    debateList  : debateList,
    debatePost  : debatePost,
    getUser     : getUser
  };

  function debateList() {
    return $http.get('/api/topics/politics/').then(complete).catch(failed);
  }

  function debatePost(post){
    return $http.post('/api/topics/politics', post).then(complete).catch(failed);
  }

  function getUser(username){
    return $http.get('/api/user/' + username).then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
