angular.module('db8').factory('debateFactory', debateFactory);

function debateFactory($http){
  return {
    debateList  : debateList
  };

  function debateList() {
    return $http.get('/api/topics/politics/').then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
