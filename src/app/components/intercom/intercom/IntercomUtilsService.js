function IntercomUtilsService($intercom, AuthService, $rootScope) {

  this.bootIntercom = function (user, args) {

    // ---
    // Bootstrap intercom.
    // ---
    $intercom.boot(_.extend(this.getIntercomUser(user), args || {}));
  };

  this.updateIntercom = function (user, args) {

    // ---
    // Update intercom.
    // ---
    $intercom.update(_.extend(this.getIntercomUser(user), args || {}));
  };

  this.trackEvent = eventName => {
    if (AuthService.isAuthenticated()) {

      $intercom.trackEvent(eventName, {
        email: $rootScope.currentUser.model.email,
        created_at: moment().unix(),
        user_id: `${$rootScope.currentUser.model.id}`,
      });
    } else {
      $intercom.trackEvent(eventName, {
        created_at: moment().unix(),
      });
    }
  };

  this.getIntercomUser = user => ({
    email: user.model.email,
    name: `${user.model.firstName} ${user.model.lastName}`,
    created_at: moment(user.model.createdDate).unix(),
    user_id: `${user.model.id}`,
  });
}

export default IntercomUtilsService;
