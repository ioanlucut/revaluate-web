function userProfilePictureHeaderDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller($scope, $rootScope) {
      const userProfileVm = this;

      /**
       * Current user.
       */
      userProfileVm.user = $rootScope.currentUser;
    },

    bindToController: true,
    controllerAs: 'userProfileVm',
    templateUrl: '/app/common/userProfilePicture/userProfilePictureHeaderDirective.tpl.html',
    link() {
    },
  };
}

export default userProfilePictureHeaderDirective;
