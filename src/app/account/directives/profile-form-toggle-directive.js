(function () {
    'use strict';

    /**
     * Directive responsible for switching update profile forms between them.
     */
    angular
        .module('revaluate.account')
        .directive('profileFormToggle', function (ProfileFormToggle, ACCOUNT_FORM_STATE) {
            return {
                restrict: 'A',
                link: function (scope) {
                    scope.ProfileFormToggle = ProfileFormToggle;
                    scope.ACCOUNT_FORM_STATE = ACCOUNT_FORM_STATE;

                    // ---
                    // Default state.
                    // ---
                    scope.ProfileFormToggle.setState(ACCOUNT_FORM_STATE.updateProfile);
                }
            };
        });
}());
