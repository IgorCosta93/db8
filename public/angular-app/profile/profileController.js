angular.module('db8').controller('profileController', profileController);

function profileController($http, $scope, AuthFactory, debateFactory,$route, $routeParams,$window,jwtHelper){
    var vm = this;
    vm.user = [];
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    vm.loggedInUser = decodedToken.username;

    //GET THE SUJESTIONS
    debateFactory.getSubjects().then(function(response){
      vm.subjects = response.data;
    });

    vm.subscribe = function(subject){
      if(subject != undefined){
        //var debateN = debate.split(",");
        if (subject.length > 0){
          for (i = 0; i < subject.length; i++){
            if(String(subject[i]["user"]) == vm.loggedInUser){
              //user = "TRUE"
              //alert(vm.conversation[i]["user"]);
              return true;
            };
          };
        };
      };
    };

    vm.notify = function(subjectID){
      subject = {
        _id   : subjectID,
        user  : vm.loggedInUser
      };
      debateFactory.notifySubject(subject).then(function(response){
        //vm.adm = response.data.adm;
      });
    }

    vm.isLoggedIn = function() {
      if (AuthFactory.isLoggedIn) {
        return true;
      } else {
        return false;
      }
    };

}
