angular.module('db8').controller('debatesController', debatesController);

function debatesController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout){
  var vm = this;

  var token = $window.sessionStorage.token;
  var decodedToken = jwtHelper.decodeToken(token);
  vm.loggedInUser = decodedToken.username;

  debateFactory.debateGetDebates(vm.loggedInUser).then(function(response){
    vm.debates = response.data;
  });


  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };
};
