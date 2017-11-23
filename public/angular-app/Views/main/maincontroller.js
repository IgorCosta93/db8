angular.module('db8').controller('MainController', MainController);

function MainController($http,debateFactory){
  var vm = this;

  //GET THE SUJESTIONS BY TOPIC
  vm.getSubjectPolitic = function(){
    debateFactory.getSubjectsTopics("Politic").then(function(response){
      vm.subjectPolitic = response.data;
      console.log(vm.subjects.length);
    });
  };

  vm.getSubjectMusic = function(){
    debateFactory.getSubjectsTopics("Music").then(function(response){
      vm.subjectMusic = response.data;
      console.log(vm.subjects.length);
    });
  };

  vm.getSubjectSoccer = function(){
    debateFactory.getSubjectsTopics("Soccer").then(function(response){
      vm.subjectSoccer = response.data;
      console.log(vm.subjects.length);
    });
  };

  vm.getSubjectScience = function(){
    debateFactory.getSubjectsTopics("Science").then(function(response){
      vm.subjectScience = response.data;
      console.log(vm.subjects.length);
    });
  };

  vm.getSubjectPolitic();
  vm.getSubjectMusic();
  vm.getSubjectSoccer();
  vm.getSubjectScience();

};
