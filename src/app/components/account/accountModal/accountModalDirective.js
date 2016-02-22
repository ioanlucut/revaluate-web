(function () {
  'use strict';

  /* Account modal */

  angular
    .module('revaluate.account')
    .directive('accountModal', function ($rootScope, $animate, ACCOUNT_FORM_STATE, AccountModal) {
      return {
        restrict: 'A',
        templateUrl: '/app/components/account/accountModal/accountModal.html',
        link: function (scope, el) {
          var CLASS_OPEN = 'account-modal--open';

          scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;

          // Get the current user
          scope.user = $rootScope.currentUser;

          // Put the account modal to scope
          scope.AccountModal = AccountModal;

          // Open or close the modal
          scope.$watch('AccountModal.isOpen', function (isOpen, isOpenOld) {
            if ( isOpen === true ) {
              $animate.addClass(el, CLASS_OPEN);
            } else if ( isOpen === false && isOpenOld === true ) {
              $animate.removeClass(el, CLASS_OPEN);
            }
          });
        },
      };
    });
}());
