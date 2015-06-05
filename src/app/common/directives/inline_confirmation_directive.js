/* Auto focus */

angular
    .module("revaluate.common")
    .directive("inlineConfirmation", function ($timeout) {
        return {
            restrict: "A",
            transclude: true,
            scope: {
                toggle: "=",
                message: "@",
                confirm: "&",
                cancel: "&"
            },
            templateUrl: "app/common/partials/inline.confirmation.html",
            link: function (scope, el, attrs) {

                // ---
                // The clear autoCancelTimeoutPromise timeout period.
                // ---
                var TIMEOUT_PERIOD = 2500;

                /**
                 * Show block content
                 * @type {boolean}
                 */
                scope.showContent = false;

                // ---
                // Define auto cancel timeout promise.
                // ---
                var autoCancelTimeoutPromise = null;

                /**
                 * Toggle content
                 */
                scope.toggleContent = function () {
                    scope.showContent = !scope.showContent;

                    if ( scope.showContent ) {
                        autoCancelTimeoutPromise = $timeout(function () {
                            scope.toggleContent()
                        }, TIMEOUT_PERIOD);
                    }
                    else if ( autoCancelTimeoutPromise ) {
                        $timeout.cancel(autoCancelTimeoutPromise);
                    }
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
