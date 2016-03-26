/**
 * Directive responsible for checking of an email is valid.
 */
function validEmailDirective() {
  return {
    require: 'ngModel',
    link(scope, el, attr, ngModel) {

      /**
       * Check whether a string is a valid email address
       *
       * @param email
       * @returns {boolean}
       */
      function isValidEmail(email) {
        return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
      }

      ngModel.$validators.validEmail = email => isValidEmail(email);
    },
  };
}

export default validEmailDirective;
