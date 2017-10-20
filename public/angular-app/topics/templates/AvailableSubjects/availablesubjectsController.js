angular.module('db8').controller('availablesubjectsController', availablesubjectsController);

function availablesubjectsController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout){
  var vm      = this;
  vm.people   = "";
  vm.position = "";
  vm.topics   = "Politic";
  vm.subject  = "";
  var user = "";

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

    debateFactory.debateSearch(vm.people, vm.position,vm.topics,vm.subject).then(function(response){
      vm.teste = response.data;

      if (response.data.length <= 0){
        var conversation = {
          topic     : vm.topics,
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
        alert(String(vm.teste[0]["_id"]));
        vm._id = String(vm.teste[0]["_id"]);
        //alert("TESTE 1");
        debateFactory.debateSearchUser(vm._id).then(function(response){
          vm.conversation = response.data;
          //alert(vm.conversation[0]["user"] + " 1");
          for (i = 0; i < vm.conversation.length; i++){
            if(String(vm.conversation[i]["user"]) == vm.loggedInUser){
              user = "TRUE"
              //alert(vm.conversation[i]["user"]);
            };
          };
          if(user=="TRUE"){
            vm.message = 'You are already in this conversation';
          }else {
            vm.message = 'Welcome to the Debate';

            var user = {
              _id        : vm._id,
              user      : vm.loggedInUser,
              position  : vm.position,
              createdOn : Date.now()
            };

            debateFactory.debateAddinDebate(user).then(function(response){

            });
          }
          alert(vm.message);
        });
      }
    });
  });

};
