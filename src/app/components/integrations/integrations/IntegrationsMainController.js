function IntegrationsMainController($scope,
                                    $rootScope,
                                    INTEGRATIONS_CONSTANTS,
                                    ALERTS_EVENTS,
                                    USER_ACTIVITY_EVENTS,
                                    ENV,
                                    SocialConnectService,
                                    StatesHandler,
                                    IntegrationsService,
                                    promiseTracker,
                                    integrations) {

  const _this = this;

  _this.user = $rootScope.currentUser;

  /**
   * Available integrations
   */
  _this.integrations = integrations;

  // ---
  // If new oauth integration is added.
  // ---
  _this.redirectUri = INTEGRATIONS_CONSTANTS.returnUriFormat.format(ENV.redirectUri);
  _this.state = JSON.stringify({ userId: _this.user.model.id });
  _this.scope = 'identify';

  /**
   * Create an deleting tracker.
   */
  _this.deleteTracker = promiseTracker();

  /**
   * Create an add tracker.
   */
  _this.addTracker = promiseTracker();

  /**
   * Delete category;
   */
  _this.deleteIntegration = deleteIntegration;

  /*
   * Add integration functionality.
   */
  _this.addIntegrationOf = addIntegrationOf;

  // ---
  // Private methods.
  // ---
  function deleteIntegration(entry) {
    IntegrationsService
      .deleteIntegration(entry, _this.deleteTracker)
      .then(() => {
        _.remove(_this.integrations, 'id', entry.id);

        $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Deleted');
        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.appIntegrationDeleted);
      })
      .catch(() => {
        $scope.$emit(ALERTS_EVENTS.DANGER, 'Ups, something went wrong.');
      });
  }

  function addIntegrationOf(provider) {
    SocialConnectService
      .connectWithAppGet(provider)
      .then(profile => {
        createOauthEntryWith(profile, _this.addTracker);
        $scope.$apply();
      })
      .then(null, () => {
        $scope.$emit(ALERTS_EVENTS.DANGER, 'Ups, something went wrong.');
        $scope.$apply();
      });
  }

  function createOauthEntryWith(profile, tracker) {
    IntegrationsService
      .addIntegrationAs(profile, tracker)
      .then(addedIntegration => {
        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.appIntegrated);

        $scope.$emit(ALERTS_EVENTS.SUCCESS, 'Integration successfully added.');

        _.remove(_this.integrations, 'id', addedIntegration.id);
        _this.integrations.push(addedIntegration);
        _this.accordionStatus.isOpen = false;
      })
      .catch(() => {
        $scope.$emit('trackEvent', USER_ACTIVITY_EVENTS.appIntegrationFailed);

        $scope.$emit(ALERTS_EVENTS.DANGER, 'Could not add integration.');
      });
  }

}

export default IntegrationsMainController;
