/* Auto focus */

function cancelAccountConfirmationDirective($timeout) {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      autoToggleWhen: '=',
      confirm: '&',
      cancel: '&',
    },
    templateUrl: '/app/components/settings/cancelAccountConfirmation/cancelAccountConfirmationDirective.html',
    link(scope) {

      /**
       * Show block content
       * @type {boolean}
       */
      scope.showContent = false;

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
      scope.toggleContent = () => {
        scope.showContent = !scope.showContent;
      };

      /**
       * Auto toggle
       */
      scope.$watch('autoToggleWhen', (val, valOld) => {
        if (val === true && valOld === false) {
          $timeout(() => {
            scope.toggleContent();
          });
        }
      });
    },
  };
}

export default cancelAccountConfirmationDirective;
