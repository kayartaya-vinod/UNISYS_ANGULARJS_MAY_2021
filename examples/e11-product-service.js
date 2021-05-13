var app = angular.module("productServiceModule", []);
var baseUrl = "http://localhost:3000/";
var productsUrl = baseUrl + "products";
var brandsUrl = baseUrl + "brands";
var categoriesUrl = baseUrl + "categories";

app.service("productService", [
  "$http",
  function ($http) {
    this.getAllProducts = function (callbackFn, errCallbackFn) {
      if (!callbackFn || typeof callbackFn !== "function") {
        throw "callback function expected, but got " + typeof callbackFn;
      }
      $http
        .get(productsUrl)
        .then(function (resp) {
          callbackFn(resp.data);
        })
        .catch(errCallbackFn);
    };

    this.getProductsByBrand = function (brand, callbackFn, errCallbackFn) {
      if (!callbackFn || typeof callbackFn !== "function") {
        throw "callback function expected, but got " + typeof callbackFn;
      }
      $http
        .get(productsUrl + "?brand=" + brand)
        .then(function (resp) {
          callbackFn(resp.data);
        })
        .catch(errCallbackFn);
    };

    this.getProductsByCategory = function (
      category,
      callbackFn,
      errCallbackFn
    ) {
      if (!callbackFn || typeof callbackFn !== "function") {
        throw "callback function expected, but got " + typeof callbackFn;
      }
      $http
        .get(productsUrl + "?category=" + category)
        .then(function (resp) {
          callbackFn(resp.data);
        })
        .catch(errCallbackFn);
    };
  },
]);
