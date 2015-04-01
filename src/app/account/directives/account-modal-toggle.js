/* Account modal toggle */

angular
    .module("account")
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
