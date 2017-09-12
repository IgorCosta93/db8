angular.module('db8').directive('mhNavigation', mhNavigation);

function mhNavigation() {
  return{
    restrict: 'E',
    templateUrl: 'templates/navigation-directive/navigation-directive.html'
  };
}
