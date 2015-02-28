'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.recipes',
    'myApp.ingredients',
    'myApp.recipeDetail',
    'myApp.addRecipe',
    'myApp.home',
    'myApp.version',
    'restangular',
]).
    config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/recipes'});

        RestangularProvider.setBaseUrl(BASE_URL)

    }]);