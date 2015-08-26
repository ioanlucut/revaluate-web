(function () {
    'use strict';

    angular
        .module('revaluate.common')
        .directive('userProfilePicture', function () {
            return {
                restrict: 'E',
                controller: function ($scope, $rootScope) {

                    var vm = this;

                    /**
                     * Current user.
                     */
                    this.user = $rootScope.currentUser;
                },

                controllerAs: 'vm',
                templateUrl: '/app/common/partials/user-profile-picture-directive.tpl.html',
                link: function (scope, el, attrs) {
                }
            }
        });
}());
