var app = angular.module("e10", ["ngRoute"]);

app.controller("main", [
  "$scope",
  function ($scope) {
    $scope.title = "Angular SPA demo";
  },
]);

app.controller("contactUsCtrl", [
  "$scope",
  function ($scope) {
    $scope.email = "vinod@vinod.co";
  },
]);

app.config([
  "$routeProvider",
  function ($routeProvider) {
    // using this $routeProvider, we can define route mappings
    // route-mapping --> route path to a view+controller+model

    $routeProvider
      .when("/home", {
        template: "<h1>You are home!</h1>",
      })
      .when("/about", {
        templateUrl: "./templates/about.html",
        controller: [
          // a anonymous controller
          "$scope",
          function ($scope) {
            $scope.fullname = "Vinod Kumar Kayartaya";
            $scope.email = "vinod@vinod.co";
            $scope.phone = "91 97314 24784";
          },
        ],
      })
      .when("/contact-us", {
        template: "<h1>Please email me at {{ email }}</h1>",
        controller: "contactUsCtrl", // a registered controller
      })
      .otherwise({
        template: "<h1>Page not found!</h1>",
      });
  },
]);
