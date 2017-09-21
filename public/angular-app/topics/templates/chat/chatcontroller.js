angular.module('db8').controller('chatController', chatController);

function chatController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper){
  var vm      = this;
  var id      = $routeParams.id;
  var token   = jwtHelper.decodeToken($window.sessionStorage.token);
  username = token.username;

  vm.post = function(){
    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    var post = {
      subject   : 'Politics',
      user      : token.username,
      coment    : vm.coment,
      createdOn : Date.now()
    };

    if (!vm.coment){
      vm.error = 'Please write your coment before.'
    } else {
      /*$http.post('/api/topics/politics', post).then(function(result){
        console.log(result);
        vm.message = 'Successful coment.';
        vm.error = '';
      }).catch(function(error){
        console.log(error);
      });*/
      debateFactory.debatePost(post).then(function(response){
        vm.debates = response.data;
      });
    }
    debateFactory.debateList().then(function(response){
      vm.debates = response.data;
    });
  };

  vm.delete = function(_id){
    console.log("ID = " + _id);
    $http.delete('/api/topics/politics/' + _id).then(function(result){
      console.log(result);
      vm.message = 'Successful coment.';
      vm.error = '';
    }).catch(function(error){
      console.log(error);
    });
    debateFactory.debateList().then(function(response){
      vm.debates = response.data;
    });
  };

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  debateFactory.debateList().then(function(response){
    vm.debates = response.data;
  });

  //VERIFY IF USER IS ADM
  debateFactory.getUser(username).then(function(response){
    vm.adm = response.data.adm;
    console.log(response.data);
  });

  /*vm.getUser = function(){
    debateFactory.getUser(username).then(function(response){
      vm.adm = response.data.adm;
      console.log(response.data);
    });
  };*/

};
