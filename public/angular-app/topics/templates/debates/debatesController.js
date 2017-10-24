angular.module('db8').controller('debatesController', debatesController);

function debatesController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout){
  var vm = this;

  debateFactory.debateGetDebates().then(function(response){
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
