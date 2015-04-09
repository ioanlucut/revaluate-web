/**
 * Directive responsible for checking of a category name is valid.
 */
angular
    .module("categories")
    .directive("validCategoryName", function () {
        return {
            require: "ngModel",
            link: function (scope, el, attr, ngModel) {

                function isValidCategoryName(categoryName) {
                    return /^([A-Za-z\d\s]){2,20}$/.test(categoryName);
                }

                ngModel.$validators.validCategoryName = function (categoryName) {
                    return isValidCategoryName(categoryName);
                };
            }
        };
    });
