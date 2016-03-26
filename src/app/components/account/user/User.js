function User(SessionService, TransformerUtils, $http, AUTH_URLS) {
  'ngInject';

  return {

    $new() {

      return {

        /**
         * User model (DTO)
         */
        model: {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          timezone: '',
          initiated: false,
          createdDate: '',
          endTrialDate: '',
          userSubscriptionStatus: '',
          emailConfirmed: false,
          connectedViaOauth: false,
          currency: {
            symbol: '',
          },
          oAuthData: {
            picture: '',
          },
        },

        /**
         * Is user already authenticated
         */
        isAuthenticated() {

          return !_.isUndefined(SessionService.sessionExists());
        },

        isConnectedViaOauth() {
          return this.model.connectedViaOauth;
        },

        /**
         * Is user already initiated
         */
        isInitiated() {
          return this.isAuthenticated() && this.model.initiated;
        },

        getTrialRemainingDays() {
          const difference = moment(this.model.endTrialDate).diff(moment(), 'days');
          if (difference < 0) {

            return 0;
          }

          return difference;
        },

        showTrialRemainingDays() {
          const trialRemainingDays = this.getTrialRemainingDays();

          return trialRemainingDays > 0 && trialRemainingDays <= 5;
        },

        isTrialPeriodExpired() {

          return false;
          /*return (this.model.userSubscriptionStatus === USER_SUBSCRIPTION_STATUS.TRIAL && this.getTrialRemainingDays() === 0) || this.model.userSubscriptionStatus === USER_SUBSCRIPTION_STATUS.TRIAL_EXPIRED;*/
        },

        /**
         * Loads a user from local storage.
         */
        loadFromSession() {

          return this.loadFrom(SessionService.getData() || {});
        },

        /**
         * Loads a user from given data.
         */
        loadFrom(data) {
          TransformerUtils.copyKeysFromTo(data, this.model);

          return this;
        },

        /**
         * Set email as confirmed
         */
        setEmailConfirmedAndReload() {
          this.loadFrom({ emailConfirmed: true });
          this.saveToSession();
        },

        /**
         * Update subscription status
         */
        setSubscriptionStatusAsAndReload(status) {
          this.loadFrom({ userSubscriptionStatus: status });
          this.saveToSession();
        },

        /**
         * Saves a user to local storage.
         */
        saveToSession() {
          const sessionData = {};
          TransformerUtils.copyKeysFromTo(this.model, sessionData, ['password']);
          SessionService.setData(sessionData);

          return this;
        },

        /**
         * Creates a user account with given fromData.
         */
        create(fromData) {
          const toBeCreated = {};
          TransformerUtils.copyKeysFromTo(fromData, toBeCreated);

          return this.createAccount(toBeCreated);
        },

        /**
         * Creates the account.
         */
        createAccount(account) {
          return $http
            .post(URLTo.api(AUTH_URLS.create), account, { skipAuthorization: true })
            .then(response => response.data);
        },

        /**
         * Updates account details of this user.
         */
        updateAccountDetails(fromData) {
          const toBeSaved = {};
          TransformerUtils.copyKeysFromTo(fromData, toBeSaved);

          return $http
            .put(URLTo.api(AUTH_URLS.updateAccountDetails), toBeSaved);
        },

        /**
         * Updates initiated status of this user.
         */
        updateInitiatedStatus(fromData) {
          const toBeSaved = {};
          TransformerUtils.copyKeysFromTo(fromData, toBeSaved);

          return $http
            .put(URLTo.api(AUTH_URLS.updateInitiatedStatus), toBeSaved);
        },

        /**
         * Update account user currency
         */
        updateCurrency(fromData) {
          const toBeSaved = {};
          TransformerUtils.copyKeysFromTo(fromData, toBeSaved);

          return $http
            .put(URLTo.api(AUTH_URLS.updateCurrency), toBeSaved);
        },

      };
    },

  };
}

export default User;
