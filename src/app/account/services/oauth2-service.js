'use strict';

angular
    .module("revaluate.account")
    .service("OAuth2Service", function (OAUTH2_CLIENT_IDS, OAUTH2_URLS, OAUTH2_SCOPE, User, USER_ACTIVITY_EVENTS, ALERTS_EVENTS, AuthService, $q, StatesHandler) {


        // ---
        // Initialize HELLO.
        // ---
        hello
            .init({ facebook: OAUTH2_CLIENT_IDS.FACEBOOK });

        this.connect = function (provider) {
            var deferred = $q.defer();

            hello(provider)
                .login({ scope: OAUTH2_SCOPE }, function () {

                    hello(provider)
                        .api("/me?fields=id,first_name,last_name,email,locale,verified,picture", function (me) {
                            deferred.resolve({
                                firstName: me.first_name,
                                lastName: me.last_name,
                                email: me.email
                            });
                        });

                }, function (err) {
                    return deferred.reject(err);
                });

            return deferred.promise;
        };
    })
;
