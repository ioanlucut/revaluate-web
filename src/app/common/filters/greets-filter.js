'use strict';

export default angular
    .module('revaluate.expenses')
    .filter('greets', function () {
        return function (greets, userName) {

            return greets.format(userName);
        };
    })
    .name;
