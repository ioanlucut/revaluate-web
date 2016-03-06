/* Auto focus */

function autoFocusDirective($timeout) {
  return {
    restrict: 'A',
    link(scope, el, attrs) {
      if (!attrs.autoFocus) {

        $timeout(() => {
          el.focus();
        });
      } else {

        // Watch the specified model, and auto-focus the element when the model is "true"
        scope.$watch(attrs.autoFocus, val => {
          if (val === true) {
            $timeout(() => {
              el.focus();
            });
          }
        });
      }
    },
  };
}

export default autoFocusDirective;
