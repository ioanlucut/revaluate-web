function SocialConnectController($scope,
                                 SocialConnectService,
                                 ALERTS_EVENTS,
                                 ALERTS_CONSTANTS,
                                 StatesHandler,
                                 APP_CONFIG,
                                 AuthService) {
  'ngInject';

  const _this = this;

  /**
   * Alert identifier
   */
  _this.alertId = ALERTS_CONSTANTS.oauthConnect;

  /*
   * Connect functionality.
   */
  _this.connectWith = provider => {
    if (!_this.isRequestPending) {

      _this.isRequestPending = true;

      SocialConnectService
        .connect(provider)
        .then(response => {
          const userType = _.find(APP_CONFIG.USER_TYPES, userTypeEntry => userTypeEntry.indexOf(provider.toUpperCase()) > -1);

          return AuthService
            .connectViaOauth(response.email,
              _.extend(response, {
                userType,
                currency: {
                  currencyCode: 'EUR',
                },
              }), {
                oAuthData: {
                  picture: response.picture,
                },
              });
        })
        .then(() => {
          _this.isRequestPending = false;
          $scope.$emit(ALERTS_EVENTS.CLEAR, {
            alertId: _this.alertId,
          });

          StatesHandler.goToExpenses();
        })
        .catch(response => {
          /* If bad feedback from server */
          _this.badPostSubmitResponse = true;
          _this.isRequestPending = false;

          $scope.$emit(ALERTS_EVENTS.DANGER, {
            message: response && response.status === 400 ? 'You can\'t connect with this email. This email is already registered but with a different provider.' : 'Ups, something went wrong.',
            alertId: _this.alertId,
          });
        });
    }
  };

}

export default SocialConnectController;
