'use strict';

/**
 * Oauth2 related constants.
 */
angular
    .module("revaluate.account")
    .constant("OAUTH2_CLIENT_IDS", {
        FACEBOOK: "933591903328760",
        GOOGLE: "",
        TWITTER: ""
    })
    .constant("OAUTH2_URLS", {
        connect: "oauth2/connect"
    })
    .constant("OAUTH2_SCOPE", "email");
