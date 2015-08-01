(function () {
    "use strict";

    angular
        .module("revaluate.common")
        .directive("validDate", function () {
            return {
                require: "ngModel",
                scope: {
                    ngModel: "="
                },
                link: function (scope, el, attr, ngModel) {

                    function isValidDate(date) {
                        return !(date === "" || _.isUndefined(date));
                    }

                    ngModel.$validators.validDate = function (date) {
                        return isValidDate(date);
                    };
                }
            };
        });
}());
