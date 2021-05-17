var app = angular.module('productServiceModule', []);
var baseUrl = 'http://localhost:3000/';
var productsUrl = baseUrl + 'products/';
var brandsUrl = baseUrl + 'brands/';
var categoriesUrl = baseUrl + 'categories/';

app.service('productService', [
    '$http',
    function ($http) {
        function httpHelper(url, callbackFn, errCallbackFn) {
            $http
                .get(url)
                .then(function (resp) {
                    callbackFn(resp.data);
                })
                .catch(errCallbackFn);
        }

        this.getProductById = function (id, callbackFn, errCallbackFn) {
            if (!callbackFn || typeof callbackFn !== 'function') {
                throw (
                    'callback function expected, but got ' + typeof callbackFn
                );
            }
            httpHelper(productsUrl + id, callbackFn, errCallbackFn);
        };

        this.getAllProducts = function (callbackFn, errCallbackFn) {
            if (!callbackFn || typeof callbackFn !== 'function') {
                throw (
                    'callback function expected, but got ' + typeof callbackFn
                );
            }
            httpHelper(productsUrl, callbackFn, errCallbackFn);
        };

        this.getProductsByBrand = function (brand, callbackFn, errCallbackFn) {
            if (!callbackFn || typeof callbackFn !== 'function') {
                throw (
                    'callback function expected, but got ' + typeof callbackFn
                );
            }
            httpHelper(
                productsUrl + '?brand=' + brand,
                callbackFn,
                errCallbackFn
            );
        };

        this.getProductsByCategory = function (
            category,
            callbackFn,
            errCallbackFn
        ) {
            if (!callbackFn || typeof callbackFn !== 'function') {
                throw (
                    'callback function expected, but got ' + typeof callbackFn
                );
            }
            httpHelper(
                productsUrl + '?category=' + category,
                callbackFn,
                errCallbackFn
            );
        };
    },
]);
