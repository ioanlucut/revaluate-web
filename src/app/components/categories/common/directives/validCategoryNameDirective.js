/**
 * Directive responsible for checking of a category name is valid.
 */
function validCategoryNameDirective() {
  return {
    require: 'ngModel',
    link(scope, el, attr, ngModel) {

      function isValidCategoryName(categoryName) {
        return /^([A-Za-z\d\s!@#\$%\^&*\)\(+=._-]){2,30}$/.test(categoryName);
      }

      ngModel.$validators.validCategoryName = categoryName => isValidCategoryName(categoryName);
    },
  };
}

export default validCategoryNameDirective;
