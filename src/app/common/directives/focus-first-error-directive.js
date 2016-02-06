'use strict';

/* Focus the first erroneous input on form submit */

export default angular
    .module('revaluate.common')
    .directive('focusFirstError', function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {

                var errorSelector = attrs.focusFirstError || '.has-error input';

                el.on('submit', function () {
                    el.find(errorSelector).first().focus();
                });
            }
        };
    })
    .name;
