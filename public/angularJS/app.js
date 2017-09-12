angular.module('db8', ['ngRoute', 'angular-jwt']).config(config);

function config($httpProvider, $routeProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'templates/main/main.html',
      controller: MainController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/register',{
      templateUrl: 'templates/register/register.html',
      controller: RegisterController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}
