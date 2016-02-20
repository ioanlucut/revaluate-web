(function () {
    'use strict';

    angular
        .module('revaluate.goals')
        .filter('goalMessage', function () {
            return function (goalMessage, userName) {

                return goalMessage.format(userName);
            };
        });
}());
