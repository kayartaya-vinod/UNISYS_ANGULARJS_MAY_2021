var app = angular.module('e12', []);

app.controller('main', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $scope.title = 'Angularjs directives demo';
        $scope.friends = ['Vinod', 'Shyam', 'Ravi', 'Kiran', 'Kishore'];
        $scope.cities = ['Bangalore', 'Mysore', 'Shivamogga'];

        $scope.products = [];
        $http
            .get('http://localhost:3000/products?_page=2')
            .then(function (resp) {
                $scope.products = resp.data;
            })
            .catch(console.error);
    },
]);

// register a directive as a function, along with any dependencies.
// the name of the directive while registering must be in camelCaps.
// while using, it should be in hyphenated format.
// For example, directive name --> appHelloWorld
// usage 1 --> <div app-hello-world ></div>
// usage 2 --> <app-hello-world ></app-hello-world>
// usage 3 --> <div class="app-hello-world" ></div>
app.directive('appHelloWorld', [
    function () {
        // this function/constructor must return a config object
        var cfg = {};
        cfg.restrict = 'EAC'; // Element, Attribute, CSS class
        cfg.template = '<p>Hello, world!</p>';
        return cfg;
    },
]);

app.directive('appBullets', [
    function () {
        var cfg = {};
        cfg.restrict = 'A'; // <div app-bullets></div>
        cfg.template = `<ul>
            <li ng-repeat="f in friends">
            {{ f | uppercase }}
            </li>
        </ul>`;
        return cfg;
    },
]);

app.directive('appList', [
    function () {
        var cfg = {};
        cfg.restrict = 'A'; // <div app-list items="cities"></div>
        cfg.scope = {
            items: '=items',
            title: '=heading',
        };
        cfg.template = `
        <h3>{{ title }}</h3>
        <ul>
            <li ng-repeat="i in items track by $index">
            {{ i }}
            </li>
        </ul>`;
        return cfg;
    },
]);

// <app-data-table array="products"></app-data-table>
// <app-data-table url="http://localhost:3000/products"></app-data-table>
// <app-data-table
//      url="'http://www.omdbapi.com/?s=spider&apikey=aa9e49f'"
//      property="'Search'"></app-data-table>
app.directive('appDataTable', [
    '$http',
    function ($http) {
        var cfg = {};
        cfg.templateUrl = './templates/app-data-table.html';
        cfg.scope = {
            // user defined variables tp receive values from the usage
            // ex: <app-data-table array="products"></app-data-table>
            array: '=?', // = means expression like scoper variable, array, object etc
            title: '@?', // @ means string literal
            exclude: '=?',
            url: '@?',
            property: '@?',
            developer: '@?',
        };
        cfg.link = function (scope, elem, attrs) {
            if ('exclude' in attrs === false) {
                scope.exclude = [];
            }
            if (attrs.url) {
                $http
                    .get(attrs.url)
                    .then((resp) => resp.data)
                    .then((data) => {
                        if (attrs.property) {
                            scope.array = data[attrs.property];
                        } else {
                            scope.array = data;
                        }

                        console.log(scope.array);
                    })
                    .catch(console.error);
            }
        };
        // cfg.compile = function () {
        //     console.log('compile() arguments is', arguments);
        // };
        return cfg;
    },
]);

app.component('appFooter', {
    template: `
    <div class="text-center">
        <div>&copy; 2021 - All rights reserved by KVinod Inc</div>
        <div>{{ $ctrl.text }}</div>
    </div>
    `,
    bindings: {
        text: '=',
    },
});
