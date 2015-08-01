(function () {
    "use strict";

    /* Account modal toggle */

    angular
        .module("revaluate.account")
        .directive("accountModalToggle", function (AccountModal) {
            return {
                restrict: "A",
                link: function (scope, el, attrs) {
                    el.on("click", function () {
                        AccountModal.openWithState(attrs.accountModalToggle);
                    });
                }
            };
        });
}());
