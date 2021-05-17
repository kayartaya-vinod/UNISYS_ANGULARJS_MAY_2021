const angular = require('angular');
require('./movie-module');
require('bootstrap/dist/css/bootstrap.css');
angular.module('mb', ['movieModule']).controller('main', [
    '$scope',
    function ($scope) {
        $scope.title = 'Movie browser';
        $scope.subtitle = 'Developed by Vinod Kumar Kayartaya';
    },
]);
require('./header');
