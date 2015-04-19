angular
    .module("common")
    .directive("validPrice", function () {
        return {
            require: "ngModel",
            scope: {
                ngModel: "="
            },
            link: function (scope, el, attr, ngModel) {

                function isValidPrice(price) {
                    return !(price === "" || _.isUndefined(price) || parseFloat(price) <= 0.01);

                }

                ngModel.$validators.validPrice = function (price) {
                    return isValidPrice(price);
                };
            }
        };
    });
