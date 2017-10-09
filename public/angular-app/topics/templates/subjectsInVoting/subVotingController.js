angular.module('db8').controller('subVotingController', subVotingController);

function subVotingController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout){
  var vm = this;

  vm.reload = function(){
    debateFactory.getSubjects().then(function(response){
      vm.subjects = response.data;
      vm.teste = vm.subjects.users;
    });
  };

  vm.UserName = function(){
    //$window.sessionStorage.token = response.data.token;
    //AuthFactory.isLoggedIn = true;
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    vm.loggedInUser = decodedToken.username;
  };

  vm.reload();

  vm.vote = function(subject){

    var topic = {
        _id   : subject._id,
        vote  : 1,
        user  : vm.loggedInUser
      };

    debateFactory.updateTopic(topic).then(function(response){
      //vm.adm = response.data.adm;
      vm.message = 'Your vote has been successfully registered.';
    });
    vm.hideLoader = false;

    vm.reload();

    $timeout(function(){
        vm.hideLoader = true;
    }, 3000);
  };

  vm.voteN = function(){
    vm.message = 'Your vote has been successfully registered. NAO';

    vm.hideLoader = false;

    vm.reload();

    $timeout(function(){
        vm.hideLoader = true;
    }, 3000);

  };

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

};
