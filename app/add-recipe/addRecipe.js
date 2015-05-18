'use strict';

angular.module('myApp.addRecipe', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-recipe', {
            templateUrl: 'add-recipe/add-recipe.html',
            controller: 'AddRecipeCtrl'
        });
    }])

    .controller('AddRecipeCtrl', ['$scope', 'Restangular', '$location', '$http', function ($scope, Restangular, $location, $http) {
        // Initialize an empty recipe object with an empty ingredients and tags list inside.
        $scope.recipe = {
            ingredients: [],
            tags: []
        };

        // Add the ingredients to the recipe object we're building
        $scope.addIngredientToRecipe = function (ingredientName) {
            var ingredient = {name: ingredientName};
            $scope.recipe.ingredients.push(ingredient);
            $scope.ingredientName = '';
        };

        // Add the tags to the recipe object we're building
        $scope.addTagToRecipe = function (tagName) {
            var tag = {name: tagName};
            $scope.recipe.tags.push(tag);
            $scope.tagName = '';
        };

        $scope.addPhoto = function () {
            var file = document.getElementById('file').files[0],
                reader = new FileReader();
            reader.onload = function (e) {
                $scope.recipe.photo = 'data:image/png;base64,' + btoa(e.target.result);
                $scope.$apply();
            };
            reader.readAsBinaryString(file);
        };

        $scope.addRecipe = function () {
            Restangular.all('add-recipe').customPOST($scope.recipe).then(function () {
                toastr.success("You successfully added your recipe");
                document.getElementById('file').value = null;
                //$scope.$apply();
                $scope.recipe.photo =null;
                $scope.recipe = {ingredients: []};

            }, function () {
                toastr.error("There was a problem creating your recipe");
            })
        };

//Restangular.all('add-recipe')
//    .withHttpConfig({transformRequest: angular.identity})
//    .customPOST(fd, '', undefined, {'Content-Type': undefined})
//    .then(function (data){
//        delete $scope.recipe.photo;
//        Restangular.one('recipes', data.id).customPUT($scope.recipe).then(function (data) {
//            alert("It worked");
//        },
//        function (data) {
//            alert("nope");
//        });
//
//
//        console.log(data);
//    },
//    function (data) {
//        console.log(data);
//        alert("There was a problem creating the recipe");
//    }
//);
//};
}])
;
//

//Add a new recipe, alert the user when it's been created or when there was a problem.
//$scope.addRecipe = function () {

//console.log($scope.recipe);
//
//var photo = $scope.recipe.photo;
//delete $scope.recipe.photo;
//
//console.log($scope.recipe);

//Restangular.all('add-recipe').customPOST($scope.recipe)
//    .withHttpConfig({transformRequest: angular.identity})
//    .customPOST(fd, '', undefined, {'Content-Type': undefined})
//    .then(function (data) {
//$scope.recipe.photo = photo;

//var fd = new FormData();
//fd.append("photo", $scope.recipe.photo);
//
//var url = 'http://localhost:8001/recipes/' + data.id;
//
//$http.patch(url, fd, {
//    headers: {'Content-Type': undefined},
//    transformRequest: angular.identity
//}).success(function (response) {
//    //$location.path('/recipes');
//    alert("Your recipe was successfully created: " + response);
//}).error(function (response) {
//    console.log('Error response: ' + response);
//})
//});
//}
//}]);