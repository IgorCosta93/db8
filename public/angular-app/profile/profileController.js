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
      for (i = 0; i < vm.subjects.length; i++){
        //console.log(String(vm.subjects[i]["_id"]));
        //vm.idArray[b]=String(vm.subjects[i]["_id"]);
        //b=b+1;
        debateFactory.getUserNotification(String(vm.subjects[i]["_id"])).then(function(response){
          vm.userNotification = response.data;
          //console.log(vm.userNotification);

          if (vm.userNotification.length == 0){
            vm.user[vm.idArray[b]] = false;
            //alert("FALSE "+b);
          };
          if (vm.userNotification.length == 1){
            vm.user[vm.idArray[b]] = true;
            //b = b+1;
            //alert("TRUE "+b);
          };

          /*for (i = 0; i < vm.userNotification.length; i++) {
              //console.log(String(vm.userNotification[i]["user"]));
              if(String(vm.userNotification[i]["user"]) == vm.loggedInUser){
                vm.user[b] = true;
                alert(String(vm.userNotification[i]["user"]));
              };
              b = b+1;
          };*/
        });
      };
    });

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
