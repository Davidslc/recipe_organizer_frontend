'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all('recipes').customGETLIST().then(function(recipes) {
        $scope.recipes = recipes;
    });

      $scope.getImageUrl = function (src) {
        return src.replace(/http:\/\/.*\/media/, BASE_URL + "/media");
    }

}]);