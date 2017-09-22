angular.module('db8').controller('debateController', debateController);

function debateController($http,$scope){
    var vm = this;

    vm.topic = vm.topicPage;
};
