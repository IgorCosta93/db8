angular.module('db8').controller('politicsController', politicsController);

function politicsController($http, $scope, AuthFactory, debateFactory,$route, $routeParams, $window,jwtHelper){
  var vm = this;

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
      $http.post('/api/topics/politics', post).then(function(result){
        console.log(result);
        vm.message = 'Successful coment.';
        vm.error = '';
      }).catch(function(error){
        console.log(error);
      });
    }
    $window.location.reload();
  };

  vm.isLoggedIn = function() {
    if (AuthFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  $scope.posts = [];
	$scope.newPost = {created_by: '', text: '', created_at: ''};

  $scope.post = function(){
    $scope.newPost.created_at = Date.now();
    //Push pass the information into the array
    $scope.posts.push($scope.newPost);
    //Here we reset the information fields on the screem
    $scope.newPost = {created_by: '', text: '', created_at: ''};
  }

  debateFactory.debateList().then(function(response){
    vm.debates = response.data;
  });


};
