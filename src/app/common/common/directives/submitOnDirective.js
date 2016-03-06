function submitOnDirective($timeout) {
  return {
    link: function (scope, elm, attrs) {
      scope.$on(attrs.submitOn, function () {
        $timeout(function () {
          elm.trigger('submit');
        });
      });
    },
  };
}

export default submitOnDirective;
