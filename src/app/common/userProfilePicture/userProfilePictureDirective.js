function userProfilePictureDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller($scope, $rootScope) {
      const vm = this;

      /**
       * Current user.
       */
      vm.user = $rootScope.currentUser;
    },

    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/common/userProfilePicture/userProfilePictureDirective.tpl.html',
    link() {
    },
  };
}

export default userProfilePictureDirective;
