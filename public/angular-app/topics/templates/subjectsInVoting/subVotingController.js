angular.module('db8').controller('subVotingController', subVotingController);

function subVotingController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper){
  var vm = this;

  vm.reload = function(){
    debateFactory.getSubjects().then(function(response){
      vm.subjects = response.data;
    });
  };

  vm.reload();

  vm.vote = function(subject){
    var selecionado = document.getElementById("SIM").checked;
    if (selecionado) {
      //window.alert("Você selecionou o checkbox SIM.");
      var topic = {
          _id   : subject._id,
          vote  : 1
        };

      debateFactory.updateTopic(topic).then(function(response){
        //vm.adm = response.data.adm;
        vm.message = 'Your vote has been successfully registered.';
      });
    }else {
      vm.message = 'Your vote has been successfully registered.';
    }
  };

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

};
