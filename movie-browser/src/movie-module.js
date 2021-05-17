const angular = require('angular');
const movieModule = angular.module('movieModule', []);

movieModule.controller('movieListController', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $scope.movies = [];

        $http
            .get('http://www.omdbapi.com/?s=spider&apikey=aa9e49f')
            .then((resp) => resp.data)
            .then((data) => ($scope.movies = data.Search))
            .catch(console.error);
    },
]);

movieModule.component('mbMovieList', {
    templateUrl: '/templates/movie-list.html',
    controller: 'movieListController',
});

module.exports = movieModule;
