/* Account modal toggle */

angular
    .module("account")
    .directive("accountModalClose", function (AccountModal) {
        return {
            restrict: "A",
            templateUrl: "app/account/partials/account_close.html",
            link: function (scope, el) {
                el.on("click", function () {
                    AccountModal.close();
                });
            }
        };
    });