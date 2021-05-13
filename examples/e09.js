var app = angular.module("e09", []);

// registering a function as a factory.
// angular calls this function only once (lazy), and collects the object returned
// and will register the same as "nameFactory". Where ever dependency of this factory
// is needed, the same object is injected.
app.service("nameFactory", function NameFactory() {
  // object creation is developer's responsibility
  return {
    names: ["John doe", "Jane doe"],
    addName: function (name) {
      if (!name) return;
      this.names.push(name);
    },
    deleteName: function (index) {
      this.names.splice(index, 1);
    },
  };
});

app.controller("c1", [
  "$scope",
  "nameFactory",
  function Ctrl1($scope, nameFactory) {
    $scope.ns = nameFactory;
  },
]);

app.controller("c2", [
  "$scope",
  "nameFactory",
  function Ctrl2($scope, nameFactory) {
    $scope.addNewName = function () {
      nameFactory.addName($scope.newName);
      $scope.newName = "";
    };
  },
]);
