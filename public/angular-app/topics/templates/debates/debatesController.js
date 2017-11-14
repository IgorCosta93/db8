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

  vm.removeNotification = function(debates){
    console.log(debates._id);
    if(debates != undefined){
      //var debateN = debate.split(",");
      if (debates.notification.length > 0){
        for (i = 0; i < debates.notification.length; i++){
          if(String(debates.notification[i]["user"]) == vm.loggedInUser){
            //console.log(String(debates.notification[i]["_id"]));
            vm.user = String(debates.notification[i]["_id"]);
          };
        };
      };
    };
    subject = {
      _id       : debates._id,
      _idNotify : vm.user
    };

    debateFactory.deleteNotification(subject).then(function(response){
      //vm.debates = response.data;
      vm.reload();
    });

    vm.reload();
  };

  /*debateFactory.debateGetUserN().then(function(response){
    vm.debatesGetUserN = response.data;
    vm.user = String(vm.debatesGetUserN[0]["user"]);
  });*/


  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };
};
