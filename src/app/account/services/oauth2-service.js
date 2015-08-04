(function () {
    'use strict';

    angular
        .module('revaluate.account')
        .service('OAuth2Service', function (ENV, OAUTH2_URLS, OAUTH2_SCOPE, $q) {

            // ---
            // Initialize HELLO.
            // ---
            hello
                .init({
                    facebook: ENV.OAUTH2_CLIENT_IDS.FACEBOOK,
                    google: ENV.OAUTH2_CLIENT_IDS.GOOGLE
                }, {
                    redirect_uri: ENV.redirectUri
                });

            /**
             * Connect with provided provider
             */
            this.connect = function (provider) {
                var deferred = $q.defer();

                hello(provider)
                    .login({ scope: OAUTH2_SCOPE }, function () {

                        hello(provider)
                            .api(provider === 'google' ? '/me' : '/me?fields=id,first_name,last_name,email,locale,verified,picture')
                            .then(function (me) {
                                deferred.resolve({
                                    firstName: me.first_name,
                                    lastName: me.last_name,
                                    email: me.email,
                                    picture: me.picture
                                });
                            }, function (response) {

                                deferred.reject(response);
                            });
                    });

                return deferred.promise;
            };
        });
}());
