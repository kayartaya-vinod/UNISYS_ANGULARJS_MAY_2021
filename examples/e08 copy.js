var anotherApp = angular.module("anotherModule", []);

// registering a Constructor as a service.
// angular js creates an object using this constructor (new NameService()) and
// stores as a singleton. Every place where a dependency of this service is required,
// the same singleton instance is injected.
anotherApp.service("nameService", function NameService() {
  this.names = ["Vinod", "Shyam", "Harsha"];

  this.addName = function (name) {
    if (!name) return;
    this.names.push(name);
  };

  this.deleteName = function (index) {
    this.names.splice(index, 1);
  };
});

var app = angular.module("e08", ["anotherModule"]);

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
  function Ctrl2($scope, nameService) {},
]);
