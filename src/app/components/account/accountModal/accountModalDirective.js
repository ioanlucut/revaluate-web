/* Account modal */

function accountModalDirective($rootScope, $animate, ACCOUNT_FORM_STATE, AccountModal) {
  'ngInject';

  return {
    restrict: 'A',
    templateUrl: '/app/components/account/accountModal/accountModal.html',
    link(scope, el) {
      const CLASS_OPEN = 'account-modal--open';

      scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;

      // Get the current user
      scope.user = $rootScope.currentUser;

      // Put the account modal to scope
      scope.AccountModal = AccountModal;

      // Open or close the modal
      scope.$watch('AccountModal.isOpen', (isOpen, isOpenOld) => {
        if (isOpen === true) {
          $animate.addClass(el, CLASS_OPEN);
        } else if (isOpen === false && isOpenOld === true) {
          $animate.removeClass(el, CLASS_OPEN);
        }
      });
    },
  };
}

export default accountModalDirective;
