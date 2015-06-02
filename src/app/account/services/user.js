angular
    .module("revaluate.account")
    .factory("User", function (SessionService, TransformerUtils, $q, $http, AUTH_URLS, USER_SUBSCRIPTION_STATUS) {
        return {

            $new: function () {

                return {

                    /**
                     * User model (DTO)
                     */
                    model: {
                        userId: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        timezone: "",
                        initiated: false,
                        createdDate: "",
                        endTrialDate: "",
                        userSubscriptionStatus: "",
                        emailConfirmed: false,
                        currency: {
                            "currencyCode": ""
                        }
                    },

                    /**
                     * Is user already authenticated
                     * @returns {*}
                     */
                    isAuthenticated: function () {
                        return SessionService.sessionExists();
                    },

                    /**
                     * Is user already initiated
                     * @returns {*}
                     */
                    isInitiated: function () {
                        return this.isAuthenticated() && this.model.initiated;
                    },

                    getTrialRemainingDays: function () {
                        var difference = moment(this.model.endTrialDate).diff(moment(), 'days');
                        if ( difference < 0 ) {

                            return 0;
                        }
                        return difference;
                    },

                    showTrialRemainingDays: function () {
                        var trialRemainingDays = this.getTrialRemainingDays();

                        return trialRemainingDays > 0 && trialRemainingDays <= 5;
                    },

                    isTrialPeriodExpired: function () {

                        return (this.model.userSubscriptionStatus === USER_SUBSCRIPTION_STATUS.TRIAL && this.getTrialRemainingDays() === 0) || this.model.userSubscriptionStatus === USER_SUBSCRIPTION_STATUS.TRIAL_EXPIRED;
                    },

                    /**
                     * Loads a user from local storage.
                     * @returns {*}
                     */
                    loadFromSession: function () {

                        return this.loadFrom(SessionService.getData() || {});
                    },

                    /**
                     * Loads a user from given data.
                     * @returns {*}
                     */
                    loadFrom: function (data) {
                        TransformerUtils.copyKeysFromTo(data, this.model);

                        return this;
                    },

                    /**
                     * Set email as confirmed
                     */
                    setEmailConfirmedAndReload: function () {
                        this.loadFrom({ emailConfirmed: true });
                        this.saveToSession();
                    },

                    /**
                     * Update subscription status
                     */
                    setSubscriptionStatusAsAndReload: function (status) {
                        this.loadFrom({ userSubscriptionStatus: status });
                        this.saveToSession();
                    },

                    /**
                     * Saves a user to local storage.
                     */
                    saveToSession: function () {
                        var sessionData = {};
                        TransformerUtils.copyKeysFromTo(this.model, sessionData, ["password"]);
                        SessionService.setData(sessionData);

                        return this;
                    },

                    /**
                     * Updates a user account.
                     * @returns {*}
                     */
                    save: function (fromData) {
                        var toBeSaved = {};
                        TransformerUtils.copyKeysFromTo(fromData, toBeSaved);

                        return this.updateAccount(toBeSaved);
                    },

                    /**
                     * Creates a user account with given fromData.
                     * @param fromData
                     * @returns {*}
                     */
                    create: function (fromData) {
                        var toBeCreated = {};
                        TransformerUtils.copyKeysFromTo(fromData, toBeCreated);

                        return this.createAccount(toBeCreated);
                    },

                    /**
                     * Retrieves details about the current account.
                     * @returns {*}
                     */
                    retrieveDetails: function () {
                        return $http.get(URLTo.api(AUTH_URLS.details));
                    },

                    /**
                     * Creates the account.
                     * @param account
                     * @returns {*}
                     */
                    createAccount: function (account) {
                        return $http
                            .post(URLTo.api(AUTH_URLS.create), account, { skipAuthorization: true })
                            .then(function (response) {
                                return response.data;
                            });
                    },

                    /**
                     * Updates given account.
                     * @param account
                     * @returns {*}
                     */
                    updateAccount: function (account) {
                        return $http
                            .put(URLTo.api(AUTH_URLS.update), account);
                    },

                    /**
                     * Update account user currency
                     */
                    updateCurrency: function (fromData) {
                        var toBeSaved = {};
                        TransformerUtils.copyKeysFromTo(fromData, toBeSaved);

                        return $http
                            .put(URLTo.api(AUTH_URLS.updateCurrency), toBeSaved);
                    }

                };
            }

        };
    });