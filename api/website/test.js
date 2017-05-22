// Inject angular-resource as ngResource into your module
var memeListApp = angular.module('RESTfulServiceExample', ['ngResource']);

// Create a service to call API which can be used by many controllers
memeListApp.factory('MemeService', ['$resource', function($resource) {
    return $resource('/memes/:_id', {memeId: '@id'});
}]);

// Create a controller that uses your service
memeListApp.controller('HomeController', function($scope, MemeService) {
    // GET: /meme/
    var memes = MemeService.query();

    // Use response in HTML template
    $scope.memes = memes;
});

// Another controller could use the same service
memeListApp.controller('MemeController', function($scope, MemeService) {
    // use memeService for another purpose
});
