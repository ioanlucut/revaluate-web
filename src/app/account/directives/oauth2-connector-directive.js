'use strict';

angular
    .module("revaluate.account")
    .directive("oauth2Connector", function (OAuth2Service, AuthService, StatesHandler) {
        return {
            restrict: "A",
            link: function (scope, el, attrs) {
                el.on("click", function () {
                    scope.isRequestPending = true;

                    OAuth2Service
                        .connect(attrs.oauth2Connector)
                        .then(function (response) {

                            AuthService
                                .connectViaOauth(response.email, _.extend(response, {
                                    currency: {
                                        "currencyCode": "EUR"
                                    }
                                }))
                                .then(function () {
                                    scope.isRequestPending = false;

                                    StatesHandler.goToExpenses();
                                });
                        })

                });
            }
        };
    });
