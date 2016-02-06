'use strict';

export default angular
    .module('revaluate.common')
    .directive('userProfilePicture', function () {
        return {
            restrict: 'E',
            scope: {},
            controller: function ($scope, $rootScope) {
                var vm = this;

                /**
                 * Current user.
                 */
                vm.user = $rootScope.currentUser;
            },
            bindToController: true,
            controllerAs: 'vm',
            templateUrl: '/app/common/partials/user-profile-picture-directive.tpl.html',
            link: function () {
            }
        };
    })
    .name;
