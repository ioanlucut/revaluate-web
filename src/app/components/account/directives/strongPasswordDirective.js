/**
 * Directive responsible for checking of a password is strong enough.
 */
function strongPasswordDirective() {
  return {
    require: 'ngModel',
    link(scope, el, attr, ngModel) {

      /**
       * Check whether a password is strong enough.
       *
       * @param password
       * @returns {boolean}
       */
      function isStrongPassword(password) {
        return !!password && password.length >= 7;
      }

      ngModel.$validators.strongPassword = password => isStrongPassword(password);
    },
  };
}

export default strongPasswordDirective;
