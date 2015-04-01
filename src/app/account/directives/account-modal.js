/* Account modal */

angular
    .module("account")
    .directive("accountModal", function ($rootScope, $animate, ACCOUNT_FORM_STATE, AccountModal) {
        return {
            restrict: "A",
            templateUrl: "app/account/partials/account.html",
            link: function (scope, el) {

                scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;

                // Get the current user
                scope.user = $rootScope.currentUser;

                // Put the account modal to scope
                scope.AccountModal = AccountModal;

                var CLASS_OPEN = "account-modal--open";
                var CLASS_OPENING = "account-modal--opening";
                var CLASS_CLOSING = "account-modal--closing";

                // Open or close the modal
                scope.$watch("AccountModal.isOpen", function (isOpen, isOpenOld) {
                    if ( isOpen === true ) {
                        $animate.addClass(el, CLASS_OPEN);
                    }
                    else if ( isOpen === false && isOpenOld === true ) {
                        $animate.addClass(el, CLASS_CLOSING, function () {
                            $animate.removeClass(el, CLASS_CLOSING);
                            $animate.removeClass(el, CLASS_OPEN);
                        });
                    }
                });
            }
        };
    });
