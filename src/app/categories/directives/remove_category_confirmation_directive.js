(function () {
    'use strict';

    /* Auto focus */

    angular
        .module('revaluate.categories')
        .directive('removeCategoryConfirmation', function ($timeout) {
            return {
                restrict: 'A',
                transclude: true,
                scope: {
                    category: '=',
                    autoToggleWhen: '=',
                    progress: '=',
                    confirm: '&',
                    cancel: '&'
                },
                templateUrl: '/app/categories/partials/remove-category-confirmation-directive.tpl.html',
                link: function (scope, el, attrs) {

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
                    scope.doConfirm = function () {
                        if (scope.messageAcknowledged) {
                            return;
                        }

                        scope.confirm();
                    };

                    /**
                     * Toggle content
                     */
                    scope.toggleConfirmationContent = function () {
                        scope.showConfirmationContent = !scope.showConfirmationContent;
                    };

                    /**
                     * Close and toggle content
                     */
                    scope.closeAndToggle = function () {
                        scope.cancel();
                        scope.toggleConfirmationContent();
                    };

                    /**
                     * Auto toggle
                     */
                    scope.$watch('autoToggleWhen', function (val, valOld) {
                        if (val === true && valOld === false) {
                            $timeout(function () {
                                scope.toggleConfirmationContent();

                            });
                        }
                    });
                }
            }
        });
}());
