(function () {
    'use strict';

    angular
        .module('revaluate.goals')
        .filter('goalTarget', function (APP_CONFIG) {
            return function (actual) {

                return _.find(APP_CONFIG.GOALS_TARGETS, 'value', actual).label;
            };
        });
}());
