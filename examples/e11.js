var app = angular.module("e11", ["ngRoute", "productServiceModule"]);

app.controller("main", [
  "$scope",
  function ($scope) {
    $scope.title = "eBasket";

    // todo: need to initialize these from REST endpoint
    $scope.brands = ["Malnad", "Zespri", "Fresho"];
    $scope.categories = ["fruit", "vegetable"];
  },
]);

app.controller("productListController", [
  "$scope",
  "productService",
  function ($scope, ps) {
    ps.getAllProducts(function (data) {
      $scope.products = data;
    });
  },
]);

app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        redirectTo: "/product-list",
      })
      .when("/product-list", {
        templateUrl: "./templates/product-list.html",
        controller: "productListController",
      });
  },
]);
