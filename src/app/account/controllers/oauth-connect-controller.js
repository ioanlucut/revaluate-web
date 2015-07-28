'use strict';

angular
    .module("revaluate.account")
    .controller("OauthConnectController", function ($rootScope, $scope, $q, $timeout, OAuth2Service, ALERTS_EVENTS, ALERTS_CONSTANTS, StatesHandler, User, AuthService) {

        /* jshint validthis: true */
        var vm = this;

        /**
         * Alert identifier
         */
        vm.alertId = ALERTS_CONSTANTS.oauthConnect;

        /*
         * Connect functionality.
         */
        vm.connectWith = function (provider) {
            if ( !vm.isRequestPending ) {

                vm.isRequestPending = true;

                OAuth2Service
                    .connect(provider)
                    .then(function (response) {
                        return AuthService
                            .connectViaOauth(response.email,
                            _.extend(response, {
                                currency: {
                                    "currencyCode": "EUR"
                                }
                            }))
                    })
                    .then(function () {
                        vm.isRequestPending = false;
                        StatesHandler.goToExpenses();
                    })
                    .catch(function () {
                        /* If bad feedback from server */
                        vm.badPostSubmitResponse = true;
                        vm.isRequestPending = false;

                        $scope.$emit(ALERTS_EVENTS.DANGER, {
                            message: "Sorry, something went wrong.",
                            alertId: vm.alertId
                        });
                    });
            }
        };

    });
