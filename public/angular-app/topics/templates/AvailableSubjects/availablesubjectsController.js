angular.module('db8').controller('availablesubjectsController', availablesubjectsController);

function availablesubjectsController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout){
  var vm = this;
  vm.people = "";
  vm.position = "";
  vm.subject = "";

  vm.reload = function(){
    debateFactory.getSubjects().then(function(response){
      vm.subjects = response.data;
    });
  };

  vm.reload();

  $('#myModal2').on('hidden.bs.modal', function () {

    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    vm.loggedInUser = decodedToken.username;

    debateFactory.debateSearch(vm.people, vm.position).then(function(response){
      vm.conversation = response.data;
      //console.log(response.data.length);
      if (response.data.length <= 0){
        var conversation = {
          topic     : "Politic",
          subject   : vm.subject,
          user      : vm.loggedInUser,
          position  : vm.position,
          userLimit : vm.people,
          createdOn : Date.now()
        };
        debateFactory.debateInsert(conversation).then(function(response){
          //CRIAR ACTION
        });
      }else {
        alert("Conversation FOUND");
      }
    });
  });

};
