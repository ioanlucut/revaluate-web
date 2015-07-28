'use strict';

angular
    .module("revaluate.account")
    .service("OAuth2Service", function (ENV, OAUTH2_URLS, OAUTH2_SCOPE, $q) {

        // ---
        // Initialize HELLO.
        // ---
        hello
            .init({
                facebook: ENV.OAUTH2_CLIENT_IDS.FACEBOOK
            });

        /**
         * Connect with provided provider
         */
        this.connect = function (provider) {
            var deferred = $q.defer();

            var providerPromise = hello(provider);

            providerPromise
                .login()
                .then(function () {
                    return providerPromise.api("/me?fields=id,first_name,last_name,email,locale,verified,picture");
                })
                .then(function (me) {
                    deferred.resolve({
                        firstName: me.first_name,
                        lastName: me.last_name,
                        email: me.email
                    });
                });

            return deferred.promise;
        };
    });
