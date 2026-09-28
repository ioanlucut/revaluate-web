function userProfilePictureDirective() {
  return {
    restrict: 'E',
    scope: {},
    controller($scope, $rootScope) {
      'ngInject';

      const _this = this;

      /**
       * Current user.
       */
      _this.user = $rootScope.currentUser;
    },

    bindToController: true,
    controllerAs: 'vm',
    templateUrl: '/app/common/userProfilePicture/userProfilePictureDirective.tpl.html',
    link() {
    },
  };
}

export default userProfilePictureDirective;
