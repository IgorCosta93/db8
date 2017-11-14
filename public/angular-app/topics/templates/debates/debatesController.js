angular.module('db8').controller('debatesController', debatesController);

function debatesController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout){
  var vm = this;

  var token = $window.sessionStorage.token;
  var decodedToken = jwtHelper.decodeToken(token);
  vm.loggedInUser = decodedToken.username;

  vm.reload = function(){
    debateFactory.debateGetDebates(vm.loggedInUser).then(function(response){
      vm.debates = response.data;
    });

    debateFactory.debateGetDebate().then(function(response){
      vm.debate = response.data;
      /*var debateN = vm.debate.notification;
      var debateNA = debateN.split(",");*/
    });
  };

  vm.reload();

  vm.debateR = function(debate){
    //console.log(debate);
    if(debate != undefined){
      //var debateN = debate.split(",");
      if (debate.length > 0){
        for (i = 0; i < debate.length; i++){
          if(String(debate[i]["user"]) == vm.loggedInUser){
            //user = "TRUE"
            //alert(vm.conversation[i]["user"]);
            return true;
          };
        };
      };
    };
  };

  vm.removeNotification = function(_id){
    debateFactory.deleteNotification(_id).then(function(response){
      //vm.debates = response.data;
    });

    vm.reload();
  };

  /*debateFactory.debateGetUserN().then(function(response){
    vm.debatesGetUserN = response.data;
    vm.user = String(vm.debatesGetUserN[0]["user"]);
  });*/

  //GET THE SUJESTIONS
  debateFactory.getSubjects().then(function(response){
    vm.subjects = response.data;

    for (i = 0; i < vm.subjects.length; i++){
      debateFactory.getUserNotification(String(vm.subjects[i]["_id"])).then(function(response){
        vm.userNotification = response.data;
        //console.log(vm.userNotification);

        if (vm.userNotification.length == 0){
          //vm.user[vm.idArray[b]] = false;
          //alert("FALSE "+b);
        };
        if (vm.userNotification.length == 1){
          //vm.user[vm.idArray[b]] = true;
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


  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };
};
