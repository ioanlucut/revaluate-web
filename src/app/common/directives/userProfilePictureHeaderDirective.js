(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('userProfilePictureHeader', function () {
            return {
                restrict: 'E',
                scope: {},
                controller: function ($scope, $rootScope) {
                    var userProfileVm = this;

                    /**
                     * Current user.
                     */
                    userProfileVm.user = $rootScope.currentUser;
                },
                bindToController: true,
                controllerAs: 'userProfileVm',
                templateUrl: '/app/common/partials/userProfilePictureHeaderDirective.tpl.html',
                link: function () {
                }
            };
        });
}());
