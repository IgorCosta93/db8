angular.module('db8').controller('controlpanelcontroller', controlpanelcontroller);

function controlpanelcontroller(debateFactory){
    var vm = this;
    var idUser;

    vm.reload = function(){
      debateFactory.getUsers().then(function(response){
        vm.users = response.data;
      });
    };

    //GET THE CONVERSATIONS
    debateFactory.debateList().then(function(response){
      vm.debates = response.data;
    });

    //GET THE SUJESTIONS
    debateFactory.getSubjects().then(function(response){
      vm.subjects = response.data;
    });

    vm.reload();

    vm.edit = function(user){

      document.getElementById("username").value = user.username;
      document.getElementById("password").value = user.password;
      document.getElementById("email").value = user.email;
      document.getElementById("tipo").value = user.adm;
      idUser = user._id;
      vm.message = "NAO";
    };

    vm.update = function(id){

      if (document.getElementById("username").value == "" || document.getElementById("password").value == "" || document.getElementById("email").value == "" || document.getElementById("tipo").value == ""){
        vm.message = "SIM";
      }else {
        var usuario = {
            _id       : idUser,
            username  : document.getElementById("username").value,
            password  : document.getElementById("password").value,
            email     : document.getElementById("email").value,
            adm       : document.getElementById("tipo").value
          };
          debateFactory.updateUser(usuario).then(function(response){
            //vm.adm = response.data.adm;
          });

          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          document.getElementById("email").value = "";
          document.getElementById("tipo").value = "";

          vm.reload();
          vm.message = "NAO";
      }

    };

    vm.delete = function(_id){

      console.log(_id);
      debateFactory.deleteUser(_id).then(function(response){
        //
      });
      vm.reload();
    };
};
