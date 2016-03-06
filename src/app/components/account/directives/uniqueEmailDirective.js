function uniqueEmailDirective($q, $timeout, UserService) {
  return {
    require: 'ngModel',
    scope: {
      ngModel: '=',
    },
    link(scope, el, attr, ngModel) {

      /**
       * Check whether a string is a valid email address.
       *
       * @param email
       * @returns {boolean}
       */
      function isValidEmail(email) {
        return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
      }

      // Re-validate on change
      scope.$watch('ngModel', value => {

        if (isValidEmail(value)) {

          // Set validity
          UserService
            .isUnique(value)
            .then(data => {

              // Make sure we are validating the latest value of the model (asynchronous responses)
              if (data.email === ngModel.$viewValue) {
                ngModel.$setValidity('uniqueEmail', data.isUnique);
              }
            });
        }
      });

    },
  };
}

export default uniqueEmailDirective;
