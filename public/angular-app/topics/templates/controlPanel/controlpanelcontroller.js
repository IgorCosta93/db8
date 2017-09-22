angular.module('db8').controller('controlpanelcontroller', controlpanelcontroller);

function controlpanelcontroller(debateFactory){
    var vm = this;
    debateFactory.getUsers().then(function(response){
      vm.users = response.data;
    });
};
