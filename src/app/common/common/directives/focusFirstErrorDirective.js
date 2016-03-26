/* Focus the first erroneous input on form submit */

function focusFirstErrorDirective() {
  return {
    restrict: 'A',
    link(scope, el, attrs) {

      const errorSelector = attrs.focusFirstError || '.has-error input';

      el.on('submit', () => {
        el.find(errorSelector).first().focus();
      });
    },
  };
}

export default focusFirstErrorDirective;
