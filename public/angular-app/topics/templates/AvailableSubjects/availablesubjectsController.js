angular.module('db8').controller('availablesubjectsController', availablesubjectsController);

function availablesubjectsController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout){
  var vm = this;
  vm.people = "";
  vm.position = "";

  vm.reload = function(){
    debateFactory.getSubjects().then(function(response){
      vm.subjects = response.data;
    });
  };

  vm.reload();

};
