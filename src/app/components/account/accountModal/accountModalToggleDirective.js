/* Account modal toggle */

function accountModalToggleDirective(AccountModal) {
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
