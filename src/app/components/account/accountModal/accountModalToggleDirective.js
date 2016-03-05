export default

/* Account modal toggle */

function (AccountModal) {
  return {
    restrict: 'A',
    link: function (scope, el, attrs) {
      el.on('click', function () {
        AccountModal.openWithState(attrs.accountModalToggle);
      });
    },
  };
}

