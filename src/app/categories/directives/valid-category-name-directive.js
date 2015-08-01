(function () {
    "use strict";

    /**
     * Directive responsible for checking of a category name is valid.
     */
    angular
        .module("revaluate.categories")
        .directive("validCategoryName", function () {
            return {
                require: "ngModel",
                link: function (scope, el, attr, ngModel) {

                    function isValidCategoryName(categoryName) {
                        return /^([A-Za-z\d\s!@#\$%\^&*\)\(+=._-]){2,30}$/.test(categoryName);
                    }

                    ngModel.$validators.validCategoryName = function (categoryName) {
                        return isValidCategoryName(categoryName);
                    };
                }
            };
        });
}());
