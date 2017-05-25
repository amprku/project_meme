var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  console.log('hi')
    $http({
        method : "GET",
        url : "http://localhost:3000/memes"
    }).then(function mySuccess(response) {
        $scope.items = response.data;
    }, function myError(response) {
        $scope.items = response.statusText;
    });
    console.log($scope)
});
