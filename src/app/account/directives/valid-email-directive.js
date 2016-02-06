'use strict';

/**
 * Directive responsible for checking of an email is valid.
 */
export default angular
    .module('revaluate.account')
    .directive('validEmail', function () {
        return {
            require: 'ngModel',
            link: function (scope, el, attr, ngModel) {

                /**
                 * Check whether a string is a valid email address
                 *
                 * @param email
                 * @returns {boolean}
                 */
                function isValidEmail(email) {
                    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
                }

                ngModel.$validators.validEmail = function (email) {
                    return isValidEmail(email);
                };
            }
        };
    })
    .name;
