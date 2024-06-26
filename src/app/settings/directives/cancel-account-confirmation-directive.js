(function () {
    'use strict';

    /* Auto focus */

    angular
        .module('revaluate.settings')
        .directive('cancelAccountConfirmation', function ($timeout) {
            return {
                restrict: 'A',
                transclude: true,
                scope: {
                    autoToggleWhen: '=',
                    confirm: '&',
                    cancel: '&'
                },
                templateUrl: '/app/settings/partials/cancel-account-confirmation-directive.tpl.html',
                link: function (scope) {

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
                        if (scope.messageAcknowledged) {
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
                    scope.$watch('autoToggleWhen', function (val, valOld) {
                        if (val === true && valOld === false) {
                            $timeout(function () {
                                scope.toggleContent();
                            });
                        }
                    });
                }
            };
        });
}());
