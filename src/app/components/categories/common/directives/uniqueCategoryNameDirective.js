function uniqueCategoryNameDirective(CategoryService) {
  'ngInject';

  return {
    require: 'ngModel',
    scope: {
      ngModel: '=',
      except: '=',
    },
    link(scope, el, attr, ngModel) {

      function isValidCategoryName(categoryName) {
        return /^([A-Za-z\d\s]){2,20}$/.test(categoryName);
      }

      // Re-validate on change
      scope.$watch('ngModel', value => {

        if (value && isValidCategoryName(value) && ngModel.$viewValue !== scope.except) {

          // Set validity
          CategoryService
            .isUnique(value)
            .then(data => {

              // Make sure we are validating the latest value of the model (asynchronous responses)
              if (data.name === ngModel.$viewValue) {
                ngModel.$setValidity('uniqueCategoryName', data.isUnique);
              }
            });
        }
      });

    },
  };
}

export default uniqueCategoryNameDirective;
