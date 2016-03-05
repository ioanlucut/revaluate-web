export default

  /**
   * Directive responsible for checking of a category color is valid hex value.
   */
  angular
    .module('revaluate.categories')
    .directive('validCategoryColor', function () {
      return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {

          function isValidCategoryColor(color) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
          }

          ngModel.$validators.validCategoryColor = function (color) {
            return isValidCategoryColor(color);
          };
        },
      };
    });

