export default

/* Account modal toggle */

angular
  .directive('accountModalToggle', function (AccountModal) {
    return {
      restrict: 'A',
      link: function (scope, el, attrs) {
        el.on('click', function () {
          AccountModal.openWithState(attrs.accountModalToggle);
        });
      },
    };
  });

