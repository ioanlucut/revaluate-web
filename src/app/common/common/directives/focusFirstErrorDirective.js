export default

  /* Focus the first erroneous input on form submit */

  function () {
      return {
        restrict: 'A',
        link: function (scope, el, attrs) {

          var errorSelector = attrs.focusFirstError || '.has-error input';

          el.on('submit', function () {
            el.find(errorSelector).first().focus();
          });
        },
      };
    }

