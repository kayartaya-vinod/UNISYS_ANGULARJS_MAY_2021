const angular = require('angular');
angular.module('mb').component('mbHeader', {
    template: `<div class="alert alert-primary">
            <div class="container">
                <h1 ng-bind="$ctrl.title"></h1>
                <p ng-bind="$ctrl.subtitle"></p>
            </div>
        </div>`,
    bindings: {
        title: '=',
        subtitle: '=',
    },
});
