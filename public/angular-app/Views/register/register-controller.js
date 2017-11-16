angular.module('db8').controller('RegisterController', RegisterController);

function RegisterController($http,$scope){
  var vm = this;

  vm.register = function() {
    var user = {
      username: vm.username,
      password: vm.password,
      email: vm.email
    };

      if (!vm.username || !vm.password){
        vm.error = 'Please add a username and a password.';
      }else {
        if (vm.password !== vm.passwordRepeat){
          vm.error = 'Please Make sure the passwords match.'
        }else{
          $http.post('/api/register', user).then(function(result){
            console.log(result);
            vm.message = 'Successful registration, please login.';
            vm.error = '';
          }).catch(function(error){
            console.log(error);
          });
        }
      }
  }
};
