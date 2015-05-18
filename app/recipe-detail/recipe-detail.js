'use strict';

angular.module('myApp.recipeDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recipes/:recipeId', {
            templateUrl: 'recipe-detail/recipe-detail.html',
            controller: 'RecipeDetailCtrl'
        });
    }])

    .controller('RecipeDetailCtrl', ['$scope', 'Restangular', '$routeParams', '$location', '$http', function ($scope, Restangular, $routeParams, $location, $http) {

        $scope.recipeId = $routeParams.recipeId;

        $scope.editing = false;

        Restangular.one('recipes', $scope.recipeId).customGET().then(function (data) {
            $scope.recipe = data;
        });

        $scope.deleteRecipe = function () {
            var confirmation = confirm('Are you sure you want to delete this recipe? This cannot be undone');

            if (confirmation) {
                Restangular.one('recipes', $scope.recipeId).customDELETE().then(function () {
                        alert('Your recipe was successfully deleted!');
                        $location.path('/recipes');
                    },
                    function () {
                        alert('There was a problem deleting your recipe')
                    })
            }
        };

        //$scope.getImageUrl = function (src) {
        //    return src.replace(/http:\/\/.*\/media/, BASE_URL + "/media");
        //};

        $scope.addPhoto = function () {
            var file = document.getElementById('file').files[0],
                reader = new FileReader();
                reader.onload = function (e) {
                $scope.recipe.photo = 'data:image/png;base64,' + btoa(e.target.result);
                $scope.$apply();
            };
            reader.readAsBinaryString(file);
        };

        $scope.updateRecipe = function () {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.recipe.photo = 'data:image/png;base64,' + btoa(e.target.result);
                Restangular.one('recipes', $scope.recipeId).customPUT($scope.recipe).then(function (recipe) {
                    $scope.editing = false;
                    toastr.success("Your recipe was successfully saved!");
                }, function (error) {
                    toastr.error("Something went wrong saving your recipe...");
                });

            };
            $http.get($scope.recipe.photo + '/', {responseType: 'arraybuffer'}).then(function(e){
                var file = new Blob([e.data]);
                reader.readAsBinaryString(file);
            });
        };

        //$scope.getImageUrl = function (src) {
        //    return src.replace(/http:\/\/.*\/media/, BASE_URL + "/media");
        //}
    }]);