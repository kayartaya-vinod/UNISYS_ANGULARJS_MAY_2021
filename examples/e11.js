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
  "$routeParams",
  "productService",
  function ($scope, $routeParams, ps) {
    if ("category" in $routeParams) {
      ps.getProductsByCategory($routeParams["category"], function (data) {
        $scope.products = data;
      });
    } else if ("brand" in $routeParams) {
      ps.getProductsByBrand($routeParams["brand"], function (data) {
        $scope.products = data;
      });
    } else {
      ps.getAllProducts(function (data) {
        $scope.products = data;
      });
    }
  },
]);

app.controller("productDetailsController", [
  "$scope",
  "$routeParams",
  "productService",
  function ($scope, $routeParams, ps) {
    var id = $routeParams["id"];
    ps.getProductById(id, function (data) {
      $scope.product = data;
    });
  },
]);

// a component is a re-usable piece of view+controller
// it is registered with "camelCapsName"
// but used as <camel-caps-name></camel-caps-name>
app.component("addToCart", {
  templateUrl: "./templates/add-to-cart.html",
});

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
      })
      .when("/product-details", {
        templateUrl: "./templates/product-details.html",
        controller: "productDetailsController",
      });
  },
]);
