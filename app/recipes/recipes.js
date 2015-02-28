'use strict';

angular.module('myApp.recipes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/recipes', {
    templateUrl: 'recipes/recipes.html',
    controller: 'RecipesCtrl'
  });
}])

.controller('RecipesCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all('recipes').customGETLIST().then(function(recipes) {
        $scope.recipes = recipes;
    });

    $scope.deleteRecipe = function(recipeID) {
        Restangular.one('recipes', recipeID).customDELETE().then(function(){
            $location.path('/recipes');
        })
    }

    $scope.getImageUrl = function (src) {
        return src.replace(/http:\/\/.*\/media/, BASE_URL + "/media");
    }
}]);