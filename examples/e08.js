var app = angular.module("e08", []);

// registering a Constructor as a service.
// angular js creates an object using this constructor (new NameService()) and
// stores as a singleton. Every place where a dependency of this service is required,
// the same singleton instance is injected.
app.service("nameService", function NameService() {

  // angular creates an object using this constructor
  this.names = ["Vinod", "Shyam", "Harsha"];

  this.addName = function (name) {
    if (!name) return;
    this.names.push(name);
  };

  this.deleteName = function (index) {
    this.names.splice(index, 1);
  };
});

app.controller("c1", [
  "$scope",
  "nameService",
  function Ctrl1($scope, nameService) {
    $scope.ns = nameService;
  },
]);

app.controller("c2", [
  "$scope",
  "nameService",
  function Ctrl2($scope, nameService) {
    $scope.addNewName = function () {
      nameService.addName($scope.newName);
      $scope.newName = "";
    };
  },
]);
