angular.module('db8').controller('availablesubjectsController', availablesubjectsController);

function availablesubjectsController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper,$timeout){
  var vm      = this;
  vm.people   = "";
  vm.position = "";
  vm.topic = $routeParams.topic;
  vm.subject  = "";
  var user = "";
  vm.userNotification = "";

  vm.getUserN = function(subject,user){
    vm.userN = '';
    vm.subject = subject;
    vm.userNotification = user;
    for (i = 0; i < vm.userNotification.length; i++){
      if (vm.userN == ''){
        vm.userN= String(vm.userNotification[i]["user"]);
        //alert(String(vm.userNotification[i]["user"]));
      }else {
        vm.userN= vm.userN + ',' +String(vm.userNotification[i]["user"]);
        //alert(String(vm.userNotification[i]["user"]));
      }
    };
    //alert("TESTE "+subject+' '+ vm.userN);
    //console.log(vm.userNotification);
  };

  vm.reload = function(){
    debateFactory.getSubjectsA(vm.topic).then(function(response){
      vm.subjects = response.data;
    });
  };

  vm.reload();

  $('#myModal2').on('hidden.bs.modal', function () {

    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    vm.loggedInUser = decodedToken.username;

    var debate = {
      people    : vm.people,
      position  : vm.position,
      topics    : vm.topics,
      subject   : vm.subject
    };

    debateFactory.debateSearch(debate).then(function(response){
      vm.teste = response.data;
      vm.positionU = vm.position;

      if (response.data.length <= 0){
        var conversation = {
          topic     : vm.topic,
          subject   : vm.subject,
          user      : vm.loggedInUser,
          position  : vm.position,
          userLimit : vm.people,
          createdOn : Date.now()
          //usersN    : vm.userN
        };

        //CRIA CONVERSATION
        debateFactory.debateInsert(conversation).then(function(response){
          vm.conRes = response.data;
          vm.idConver = vm.conRes._id
          //console.log("DIRECT RESPONSE :"+vm.conRes._id);
          //console.log("VAR RESPONSE "+ vm.idConver);

          vm.userNN = vm.userN.split(",");
          for (var i = 0; i < vm.userNN.length; i++) {
            var conUsers = {
              _id       : vm.conRes._id,
              usersN    : vm.userNN[i]
            };

            //ADD USERS NOTIFICATION
            debateFactory.debateInsertUsers(conUsers).then(function(response){

            });
          };

        });



      }else {
        //alert(String(vm.teste[0]["_id"]));
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
            vm.message = 'You are already in this conversation ';

          }else {

            if (vm.people == 2){
              //alert(vm.position);
              //POSITION--------------------------------------------------------
              debateFactory.debateSearchP(vm._id).then(function(response){
                vm.position = response.data;
                vm.one = 0;
                vm.two = 0;
                vm.three = 0;
                for (i = 0; i < vm.position.length; i++){
                  if (vm.position[i]["position"] == 1){
                    //alert(vm.position[i]["position"]);
                    vm.one = vm.one + 1;
                  }else if (vm.position[i]["position"] == 2) {
                    //alert(vm.position[i]["position"]);
                    vm.two = vm.two + 1;
                  }else if (vm.position[i]["position"] == 3) {
                    vm.three = vm.three + 1;
                  }
                };

                alert("Position Two " + vm.two);
                if (vm.one >= 2 || vm.two >= 2 || vm.three >= 2){
                  console.log("BIGGER THAN Size");
                  alert("Sorry we couldn`t find a debate for you.");
                }else {
                  vm.message = 'Welcome to the Debate';

                  var user = {
                    _id        : vm._id,
                    user      : vm.loggedInUser,
                    position  : vm.positionU,
                    createdOn : Date.now()
                  };

                  debateFactory.debateAddinDebate(user).then(function(response){

                  });
                }
                //alert("Position One: " + vm.one + " - Positon Two: " + vm.two + " - Position Three: " + vm.three);

              });
            }else if (vm.people == 4) {
              //POSITION--------------------------------------------------------
              debateFactory.debateSearchP(vm._id).then(function(response){
                vm.position = response.data;
                vm.one = 0;
                vm.two = 0;
                vm.three = 0;
                for (i = 0; i < vm.position.length; i++){
                  if (vm.position[i]["position"] == 1){
                    //alert(vm.position[i]["position"]);
                    vm.one = vm.one + 1;
                  }else if (vm.position[i]["position"] == 2) {
                    //alert(vm.position[i]["position"]);
                    vm.two = vm.two + 1;
                  }else if (vm.position[i]["position"] == 3) {
                    vm.three = vm.three + 1;
                  }
                };

                alert("Position Two " + vm.two);
                if (vm.one >= 3 || vm.two >= 3 || vm.three >= 3){
                  console.log("BIGGER THAN Size");
                  alert("Sorry we couldn`t find a debate for you.");
                }else {
                  vm.message = 'Welcome to the Debate';

                  var user = {
                    _id        : vm._id,
                    user      : vm.loggedInUser,
                    position  : vm.positionU,
                    createdOn : Date.now()
                  };

                  debateFactory.debateAddinDebate(user).then(function(response){

                  });
                }
                //alert("Position One: " + vm.one + " - Positon Two: " + vm.two + " - Position Three: " + vm.three);

              });
            };

          }//END ELSE --------------------------------
          alert(vm.message);
        });//END SEARCHUSER -----------------------------------------------
      }//END ELSE
    });//END DEBATE SEARCH
  });

};
