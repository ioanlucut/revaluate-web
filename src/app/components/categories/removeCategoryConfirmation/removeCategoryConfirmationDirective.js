/* Auto focus */

function removeCategoryConfirmationDirective($timeout) {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      category: '=',
      autoToggleWhen: '=',
      progressTracker: '=',
      confirm: '&',
      cancel: '&',
    },
    templateUrl: '/app/components/categories/removeCategoryConfirmation/removeCategoryConfirmationDirective.tpl.html',
    link(scope) {

      /**
       * Show block content
       * @type {boolean}
       */
      scope.showConfirmationContent = false;

      /**
       * Is message acknowledge
       * @type {boolean}
       */
      scope.messageAcknowledged = false;

      /**
       * Perform confirm.
       */
      scope.doConfirm = () => {
        if (scope.messageAcknowledged) {
          return;
        }

        scope.confirm();
      };

      /**
       * Toggle content
       */
      scope.toggleConfirmationContent = () => {
        scope.showConfirmationContent = !scope.showConfirmationContent;
      };

      /**
       * Close and toggle content
       */
      scope.closeAndToggle = () => {
        scope.cancel();
        scope.toggleConfirmationContent();
      };

      /**
       * Auto toggle
       */
      scope.$watch('autoToggleWhen', (val, valOld) => {
        if (val === true && valOld === false) {
          $timeout(() => {
            scope.toggleConfirmationContent();
          });
        }
      });
    },
  };
}

export default removeCategoryConfirmationDirective;
