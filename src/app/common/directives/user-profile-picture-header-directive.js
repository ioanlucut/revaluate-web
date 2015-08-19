(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('userProfilePictureHeader', function () {
            return {
                restrict: 'E',
                controller: function ($scope, $rootScope) {

                    var userProfileVm = this;

                    /**
                     * Current user.
                     */
                    this.user = $rootScope.currentUser;
                },

                controllerAs: 'userProfileVm',
                templateUrl: '/app/common/partials/user-profile-picture-header-directive.tpl.html',
                link: function (scope, el, attrs) {
                }
            }
        });
}());
