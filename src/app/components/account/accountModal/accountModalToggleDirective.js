/* Account modal toggle */

function accountModalToggleDirective(AccountModal) {
  return {
    restrict: 'A',
    link: function (scope, el, attrs) {
      el.on('click', function () {
        AccountModal.openWithState(attrs.accountModalToggle);
      });
    },
  };
}

export default accountModalToggleDirective;
