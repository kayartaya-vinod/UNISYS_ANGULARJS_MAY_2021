var cartModule = angular.module('cartModule', []); // new module

// a component is a re-usable piece of view+controller
// it is registered with "camelCapsName"
// but used as <camel-cps-name></camel-caps-name>
cartModule.component('addToCart', {
    templateUrl: './templates/add-to-cart.html',
    controller: 'addToCartController',
    bindings: {
        product: '=',
    },
});

// <add-to-cart product="..."></add-to-cart>

cartModule.service('cartService', [
    function () {
        this.lineItems = []; // a line-item is a combination of product + quantity
        if ('cart' in localStorage) {
            this.lineItems = JSON.parse(localStorage.getItem('cart'));
        }

        this.addToCart = function (product) {
            var index = this.lineItems.findIndex(
                (li) => li.product.id === product.id
            );
            if (index === -1) {
                this.lineItems.push({ product, quantity: 1 });
            } else {
                this.lineItems[index].quantity++;
            }
            localStorage.setItem('cart', JSON.stringify(this.lineItems));
        };

        this.emptyCart = function () {
            this.lineItems.length = 0;
            localStorage.setItem('cart', '[]');
        };

        this.reduceInCart = function (product) {
            var index = this.lineItems.findIndex(
                (li) => li.product.id === product.id
            );
            if (index !== -1) {
                if (this.lineItems[index].quantity === 1) {
                    this.lineItems.splice(index, 1);
                } else {
                    this.lineItems[index].quantity--;
                }
            }
            localStorage.setItem('cart', JSON.stringify(this.lineItems));
        };

        this.getQuantity = function (id) {
            var item = this.lineItems.find((item) => item.product.id === id);
            return item ? item.quantity : 0;
        };
    },
]);

cartModule.controller('addToCartController', [
    '$scope',
    'cartService',
    function ($scope, cs) {
        $scope.incrQty = function (product) {
            cs.addToCart(product);
        };
        $scope.decrQty = function (product) {
            cs.reduceInCart(product);
        };
        $scope.getQuantity = function (id) {
            return cs.getQuantity(id);
        };
    },
]);
