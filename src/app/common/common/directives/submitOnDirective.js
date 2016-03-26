function submitOnDirective($timeout) {
  'ngInject';

  return {
    link(scope, elm, attrs) {
      scope.$on(attrs.submitOn, () => {
        $timeout(() => {
          elm.trigger('submit');
        });
      });
    },
  };
}

export default submitOnDirective;
