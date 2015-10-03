(function (hello) {
    'use strict';

    hello.init({

        slack: {
            name: 'Slack',
            oauth: {
                version: 2,
                auth: 'https://slack.com/oauth/authorize',
                grant: 'https://slack.com/api/oauth.access',
                oauth_proxy: 'http://localhost:8080/oauth/grant'
            },
            refresh: false,
            scope: {
                identify: 'identify'
            },
            scope_delim: ' ',
            base: 'https://slack.com/api/',
            get: {
                me: 'auth.test'
            },
            xhr: function (p, qs) {
                qs.token = p.query.access_token;
                return true;
            },
            form: false,
            jsonp: false
        }
    });

})(hello);
