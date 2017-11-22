angular.module('db8').controller('MainController', MainController);

function MainController($http,debateFactory){
  var vm = this;
  //GET THE SUJESTIONS
  debateFactory.getSubjects().then(function(response){
    vm.subjects = response.data;
    console.log(vm.subjects);
  });

};
