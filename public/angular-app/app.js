angular.module('db8', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
      templateUrl : 'angular-app/main/main.html',
      controller    : MainController,
      controllerAs  : 'vm',
      access      : {
        restricted: false
      }
    })
    .when('/register', {
      templateUrl   : 'angular-app/register/register.html',
      controller    : RegisterController,
      controllerAs  : 'vm',
      access: {
        restricted: false
      }
    })
    .when('/topics', {
      templateUrl   : 'angular-app/topics/topics.html',
      controller    : TopicsController,
      controllerAs  : 'vm',
      access: {
        restricted: false
      }
    })
    .when('/topics/subjectoptions', {
      templateUrl   : 'angular-app/topics/templates/subjectOptions/subjectoptions.html',
      //controller    : politicsController,
      //controllerAs  : 'vm',
      access: {
        restricted: false
      }
    })
    .when('/topics/availableSubjects', {
      templateUrl   : 'angular-app/topics/templates/AvailableSubjects/availablesubjects.html',
      controller    : chatController,
      controllerAs  : 'vm',
      access: {
        restricted: false
      }
    })
    .when('/profile', {
      templateUrl : 'angular-app/profile/profile.html',
      access      : {
        restricted: true
      }
    })
    .when('/chat',{
      templateUrl   : 'angular-app/topics/templates/chat/chat.html',
      controller    : chatController,
      controllerAs  : 'vm',
      access        : {
        restricted : false
      }
    })
    .when('/topics/sujestsubject',{
      templateUrl   : 'angular-app/topics/templates/SujestSubject/sujestsubject.html',
      controller    : sujestionController,
      controllerAs  : 'vm',
      access        : {
        restricted : false
      }
    })
    .when('/controlPanel', {
      templateUrl   : 'angular-app/topics/templates/controlPanel/controlPanel.html',
      controller    : controlpanelcontroller,
      controllerAs  : 'vm',
      access        : {
        restricted  : false
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}
