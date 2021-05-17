var app = angular.module('e11', [
    'ngRoute',
    'productServiceModule',
    'cartModule',
]);

app.controller('main', [
    '$scope',
    'cartService',
    function ($scope, cs) {
        $scope.title = 'eBasket';
        $scope.cs = cs;

        // todo: need to initialize these from REST endpoint
        $scope.brands = ['Malnad', 'Zespri', 'Fresho'];
        $scope.categories = ['fruit', 'vegetable'];
    },
]);

app.controller('productListController', [
    '$scope',
    '$routeParams',
    'productService',
    function ($scope, $routeParams, ps) {
        if ('category' in $routeParams) {
            ps.getProductsByCategory($routeParams['category'], function (data) {
                $scope.products = data;
            });
        } else if ('brand' in $routeParams) {
            ps.getProductsByBrand($routeParams['brand'], function (data) {
                $scope.products = data;
            });
        } else {
            ps.getAllProducts(function (data) {
                $scope.products = data;
            });
        }
    },
]);

app.controller('productDetailsController', [
    '$scope',
    '$routeParams',
    '$location',
    'productService',
    function ($scope, $routeParams, $location, ps) {
        var id = $routeParams['id'];
        if (!id) {
            $location.url('/');
            return;
        }
        ps.getProductById(id, function (data) {
            $scope.product = data;
        });
    },
]);

app.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/product-list',
            })
            .when('/product-list', {
                templateUrl: './templates/product-list.html',
                controller: 'productListController',
            })
            .when('/product-details', {
                templateUrl: './templates/product-details.html',
                controller: 'productDetailsController',
            });
    },
]);

// <app-nav-items heading="'Choose by category'" array="categories"></app-nav-items>
// <div app-nav-itesm heading="'Choose by brand'" array="brands"></div>
app.directive('appNavItems', [
    function () {
        return {
            restrict: 'EA',
            scope: {
                array: '=array',
                heading: '=heading',
                page: '=page',
                filterBy: '=filterBy',
            },
            template: `
            <h5>{{ heading }}</h5>
            <ul class="list-group">
                <li class="list-group-item" ng-repeat="val in array track by $index">
                <a href="{{page}}?{{filterBy}}={{val}}" class="btn btn-link">{{ val }}</a>
                </li>
            </ul>
            `,
        };
    },
]);
