'use strict';

export default angular
    .module('revaluate.common')
    .directive('layzrInitializer', function () {
        return {
            restrict: 'A',
            link: function () {

                new Layzr();
            }
        };
    })
    .name;
