var app = angular.module("e03", []);

// register a function as a controller named "c1"
app.controller("c1", function ($scope) {
  $scope.title = "Angular built in directives demo";
  $scope.friends = ["Vinod", "Naveen", "Shyam", "Harsha", "Naveen", "Phaniraj"];

  $scope.addName = function () {
    if ($scope.newFriend) {
      $scope.friends.push($scope.newFriend);
      $scope.newFriend = "";
    }
  };
});
