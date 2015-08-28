(function () {
    'use strict';

    angular
        .module('revaluate.account')
        .controller('OauthConnectController', function ($rootScope, $scope, $q, $timeout, OAuth2Service, ALERTS_EVENTS, ALERTS_CONSTANTS, StatesHandler, User, APP_CONFIG, AuthService) {

            var vm = this;

            /**
             * Alert identifier
             */
            vm.alertId = ALERTS_CONSTANTS.oauthConnect;

            /*
             * Connect functionality.
             */
            vm.connectWith = function (provider) {
                if (!vm.isRequestPending) {

                    vm.isRequestPending = true;

                    OAuth2Service
                        .connect(provider)
                        .then(function (response) {
                            var userType = _.find(APP_CONFIG.USER_TYPES, function (userTypeEntry) {
                                return userTypeEntry.indexOf(provider.toUpperCase()) > -1;
                            });

                            return AuthService
                                .connectViaOauth(response.email,
                                _.extend(response, {
                                    userType: userType,
                                    currency: {
                                        'currencyCode': 'EUR'
                                    }
                                }), {
                                    oAuthData: {
                                        picture: response.picture
                                    }
                                });
                        })
                        .then(function () {
                            vm.isRequestPending = false;
                            $scope.$emit(ALERTS_EVENTS.CLEAR, {
                                alertId: vm.alertId
                            });

                            StatesHandler.goToExpenses();
                        })
                        .catch(function (response) {
                            /* If bad feedback from server */
                            vm.badPostSubmitResponse = true;
                            vm.isRequestPending = false;

                            $scope.$emit(ALERTS_EVENTS.DANGER, {
                                message: response && response.status === 400 ? 'You can\'t connect with this email. This email is already registered but with a different provider.' : 'Sorry, something went wrong.',
                                alertId: vm.alertId
                            });
                        });
                }
            };

        });
}());
