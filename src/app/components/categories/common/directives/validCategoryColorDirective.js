/**
 * Directive responsible for checking of a category color is valid hex value.
 */
function validCategoryColorDirective() {
  return {
    require: 'ngModel',
    link(scope, el, attr, ngModel) {

      function isValidCategoryColor(color) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
      }

      ngModel.$validators.validCategoryColor = color => isValidCategoryColor(color);
    },
  };
}

export default validCategoryColorDirective;
