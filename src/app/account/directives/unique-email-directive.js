angular
    .module("account")
    .directive("uniqueEmail", function ($q, $timeout, UserService) {
        return {
            require: "ngModel",
            scope: {
                ngModel: "="
            },
            link: function (scope, el, attr, ngModel) {

                /**
                 * Check whether a string is a valid email address.
                 *
                 * @param email
                 * @returns {boolean}
                 */
                function isValidEmail(email) {
                    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
                }

                // Re-validate on change
                scope.$watch("ngModel", function (value) {

                    if ( isValidEmail(value) ) {

                        // Set validity
                        UserService
                            .isUnique(value)
                            .then(function (data) {

                                // Make sure we are validating the latest value of the model (asynchronous responses)
                                if ( data.email === ngModel.$viewValue ) {
                                    ngModel.$setValidity('uniqueEmail', data.isUnique);
                                }
                            });
                    }
                });

            }
        };
    });