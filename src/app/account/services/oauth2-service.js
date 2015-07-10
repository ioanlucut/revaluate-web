'use strict';

angular
    .module("revaluate.account")
    .service("OAuth2Service", function (OAUTH2_CLIENT_IDS, OAUTH2_URLS, OAUTH2_SCOPE) {


        // ---
        // Initialize HELLO.
        // ---
        hello
            .init({ facebook: OAUTH2_CLIENT_IDS.FACEBOOK });

        this.connect = function (provider) {

            hello(provider)
                .login({ scope: OAUTH2_SCOPE }, function () {

                    hello(provider)
                        .api("/me?fields=id,first_name,last_name,email,locale,verified,picture", function (me) {

                            var postData = {
                                provider: provider,
                                firstName: me.first_name,
                                lastName: me.last_name,
                                email: me.email,
                                locale: me.locale,
                                verified: me.verified,
                                profileUrl: me.picture,
                                id: me.id
                            };

                            console.log(postData);
                        })
                })

        };
    })
;
