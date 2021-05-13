var app = angular.module("e07", []);

app.controller("main", [
  "$scope",
  function ($scope) {
    $scope.title = "Angular JS - FILTER demo";
    $scope.dob = "1974-01-20"; // ISO date format
  },
]);

app.filter("age", [
  function () {
    return function ageFilter(dt, flag) {
      dt = new Date(dt);
      var diff = Date.now() - dt.getTime();
      diff = new Date(diff); // will be offset from 1970
      var y = diff.getFullYear() - 1970;
      var m = diff.getMonth();
      var d = diff.getDate();

      switch (flag) {
        case 1:
          return `${y} years, ${m} months and ${d} days.`;
        case 2:
          return `${y} years and ${m} months.`;
        default:
          return `${y} years.`;
      }
    };
  },
]);

function titlecaseFilter(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// register a filter called "titlecase" as a function
app.filter("titlecase", function () {
  return titlecaseFilter;
});

// register a filter (or pipe) called "reverse"
app.filter("reverse", function () {
  // the arguments of this function are dependencies from angularjs
  console.log("calling f1()");
  // the actual function called when the filter is used is returned from here
  return function reverseFilter(str) {
    // the arguments of this function are coming from the usage of the filter (ex {{"vinod" | reverse}})
    console.log("calling f2()");
    return str.split("").reverse().join("");
  };
});
