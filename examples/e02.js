var app = angular.module("e02", []);

app.controller("c1", function ($scope) {
  // $scope is a container of model data and functions
  $scope.title = "Angular JS 1.8 demo";
  $scope.num = 0;

  $scope.decrement = function () {
    $scope.num--;
  };
  $scope.increment = function () {
    $scope.num++;
  };
});

// var app=angular.module("e02",[]);app.controller("c1",function(n){n.title="Angular JS 1.8 demo",n.num=0,n.decrement=function(){n.num--},n.increment=function(){n.num++}});
