function userProfilePictureHeaderDirective() {
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
    templateUrl: '/app/common/userProfilePicture/userProfilePictureHeaderDirective.tpl.html',
    link: function () {
    },
  };
}

export default userProfilePictureHeaderDirective;
