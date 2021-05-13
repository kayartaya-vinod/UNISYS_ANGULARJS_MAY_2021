var app = angular.module("e05", []);

// better way to register controller, directive, pipe, service, ...
// second parameter is an array instead of a function
// the first 'n' elements are string literals representing dependencies
// the last element of the array is the actual function
// the function recieves all the depdencies

app.controller("c1", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.products = [];
    $scope.size = 10;

    // the promise implemented using qjs not es6 Promise (use Axios for this)
    $http
      // .get("https://vinbasket.herokuapp.com/products")
      .get("http://localhost:3000/products")
      .then(function () {
        $scope.products = arguments[0].data;
      }) // register a callback when the request is successful
      .catch(function () {}); // register a callback when the request fails
  },
]);
