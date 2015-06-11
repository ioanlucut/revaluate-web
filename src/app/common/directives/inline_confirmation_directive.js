/* Auto focus */

angular
    .module("revaluate.common")
    .directive("inlineConfirmation", function ($timeout) {
        return {
            restrict: "A",
            transclude: true,
            scope: {
                toggle: "=",
                confirm: "&",
                cancel: "&"
            },
            templateUrl: "app/common/partials/inline.confirmation.html",
            link: function (scope, el, attrs) {

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
                scope.doConfirm = function () {
                    if ( scope.messageAcknowledged ) {
                        return;
                    }

                    scope.confirm();
                };

                /**
                 * Toggle content
                 */
                scope.toggleContent = function () {
                    scope.showContent = !scope.showContent;
                };

                /**
                 * Auto toggle
                 */
                scope.$watch('toggle', function (val, valOld) {
                    if ( val === true && valOld === false ) {
                        $timeout(function () {
                            scope.toggleContent();
                        });
                    }
                });
            }
        }
    });
