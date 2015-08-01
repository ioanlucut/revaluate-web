(function () {
    'use strict';

    angular
        .module('revaluate.categories')
        .service('CategoryColorService', function () {

            return {
                randomizedColor: function (colors) {

                    return colors[Math.floor(Math.random() * colors.length)];
                }
            }
        });
}());
