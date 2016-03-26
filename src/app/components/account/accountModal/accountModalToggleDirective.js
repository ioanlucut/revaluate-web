/* Account modal toggle */

function accountModalToggleDirective(AccountModal) {
  'ngInject';

  return {
    restrict: 'A',
    link(scope, el, attrs) {
      el.on('click', () => {
        AccountModal.openWithState(attrs.accountModalToggle);
      });
    },
  };
}

export default accountModalToggleDirective;
