angular.module('db8').controller('controlpanelcontroller', controlpanelcontroller);

function controlpanelcontroller(debateFactory,$scope){
    var vm = this;
    var idUser;
    var idSubject;
    var idConversation;

    //------------------------------VISIBILITY

    document.getElementById('Overview').style.display = 'inherit';
    document.getElementById('latestUsers').style.display = 'inherit';
    document.getElementById('users').style.display = 'none';
    document.getElementById('sujestion').style.display = 'none';
    document.getElementById('posts').style.display = 'none';

    vm.controlVisible = function(){
      document.getElementById('Overview').style.display = 'inherit';
      document.getElementById('latestUsers').style.display = 'inherit';
      document.getElementById('users').style.display = 'none';
      document.getElementById('sujestion').style.display = 'none';
      document.getElementById('posts').style.display = 'none';
    };

    vm.usersVisible = function(){
      document.getElementById('Overview').style.display = 'none';
      document.getElementById('latestUsers').style.display = 'none';
      document.getElementById('users').style.display = 'inherit';
      document.getElementById('sujestion').style.display = 'none';
      document.getElementById('posts').style.display = 'none';
    };

    vm.sujestionVisible = function(){
      document.getElementById('Overview').style.display = 'none';
      document.getElementById('latestUsers').style.display = 'none';
      document.getElementById('users').style.display = 'none';
      document.getElementById('sujestion').style.display = 'inherit';
      document.getElementById('posts').style.display = 'none';
    };

    vm.postsVisible = function(){
      document.getElementById('Overview').style.display = 'none';
      document.getElementById('latestUsers').style.display = 'none';
      document.getElementById('users').style.display = 'none';
      document.getElementById('sujestion').style.display = 'none';
      document.getElementById('posts').style.display = 'inherit';
    };

    //---------------------USERS------------------------------------------------

    vm.reload = function(){
      // GET USERS
      debateFactory.getUsers().then(function(response){
        vm.users = response.data;
      });

      //GET THE SUJESTIONS
      debateFactory.getSubjects().then(function(response){
        vm.subjects = response.data;
      });

      //GET THE CONVERSATIONS
      debateFactory.debateList().then(function(response){
        vm.debates = response.data;
      });
    };

    vm.reload();

    vm.edit = function(user){

      document.getElementById("username").value = user.username;
      //document.getElementById("password").value = user.password;
      document.getElementById("email").value = user.email;
      document.getElementById("tipo").value = user.adm;
      idUser = user._id;
      vm.message = "NAO";
    };

    vm.update = function(id){

      if (document.getElementById("username").value == "" || document.getElementById("email").value == "" || document.getElementById("tipo").value == ""){
        vm.message = "SIM";
      }else {
        var usuario = {
            _id       : idUser,
            username  : document.getElementById("username").value,
            //password  : document.getElementById("password").value,
            email     : document.getElementById("email").value,
            adm       : document.getElementById("tipo").value
          };
          debateFactory.updateUser(usuario).then(function(response){
            //vm.adm = response.data.adm;
          });

          document.getElementById("username").value = "";
          document.getElementById("email").value = "";
          document.getElementById("tipo").value = "";

          vm.reload();
          vm.message = "NAO";
      }
      vm.reload();
    };

    vm.delete = function(_id){

      console.log(_id);
      debateFactory.deleteUser(_id).then(function(response){
        //
      });
      vm.reload();
    };

    //-------------------------------------CONVERSATIONS---------------------------------------------

    //GET THE CONVERSATIONS
    debateFactory.debateList().then(function(response){
      vm.debates = response.data;
    });

    vm.editConversations = function(debate){
      document.getElementById("topicDebate").value      = debate.subject;
      document.getElementById("userDebate").value       = debate.user;
      document.getElementById("coment").value           = debate.coment;
      document.getElementById("createdOnDebate").value  = debate.createdOn;
      idConversation = debate._id;
      vm.message = "NAO";
    };

    vm.updateConversations = function(id){
      if (document.getElementById("topicDebate").value == "" || document.getElementById("userDebate").value == "" || document.getElementById("coment").value == "" || document.getElementById("createdOnDebate").value == ""){
        vm.message = "SIM";
      }else {
        console.log("UPDATE");
        var conversation = {
            _id       : idConversation,
            subject   : document.getElementById("topicDebate").value,
            user      : document.getElementById("userDebate").value,
            coment    : document.getElementById("coment").value,
            createdOn : document.getElementById("createdOnDebate").value
          };
          debateFactory.updateDebate(conversation).then(function(response){
            //vm.adm = response.data.adm;
          });

          document.getElementById("topicDebate").value = "";
          document.getElementById("userDebate").value = "";
          document.getElementById("coment").value = "";
          document.getElementById("createdOnDebate").value = "";

          //vm.reload();
          vm.message = "NAO";
      }
      vm.reload();
    };

    vm.deleteConversations = function(_id){
      debateFactory.deleteDebate(_id).then(function(response){
      });
      vm.reload();
    };

    //-------------------------------------SUJESTIONS------------------------------------------------

    //GET THE SUJESTIONS
    debateFactory.getSubjects().then(function(response){
      vm.subjects = response.data;
    });

    vm.editSujestion = function(subject){
      document.getElementById("topic").value      = subject.topic;
      document.getElementById("sujestio").value   = subject.subject;
      document.getElementById("votes").value      = subject.votes;
      document.getElementById("createdOn").value  = subject.createdOn;
      document.getElementById("active").value     = subject.active;
      idSubject = subject._id;
      vm.message = "NAO";
    };

    vm.updateSujestion = function(id){

      if (document.getElementById("topic").value == "" || document.getElementById("sujestion").value == "" || document.getElementById("createdOn").value == ""){
        vm.message = "SIM";
      }else {
        var sujestion = {
            _id       : idSubject,
            topic     : document.getElementById("topic").value,
            sujestion : document.getElementById("sujestio").value,
            votes     : document.getElementById("votes").value,
            createdOn : document.getElementById("createdOn").value,
            active    : document.getElementById("active").value
          };
          debateFactory.updateSujestion(sujestion).then(function(response){
            //vm.adm = response.data.adm;
          });

          document.getElementById("topic").value = "";
          document.getElementById("sujestio").value = "";
          document.getElementById("votes").value = "";
          document.getElementById("createdOn").value = "";
          document.getElementById("active").value = "";

          vm.reload();
          vm.message = "NAO";
      }
      vm.reload();
    };

    vm.deleteSujestion = function(_id){
      debateFactory.deleteTopic(_id).then(function(response){
      });
      vm.reload();
    };
};
