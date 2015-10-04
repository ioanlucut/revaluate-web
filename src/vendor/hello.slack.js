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

function handleSlackResponseHandler(window, parent) {
    var _this = this,
        p,
        location = window.location;

    p = _this.merge(_this.param(location.search || ''), _this.param(location.hash || ''));

    if (('error' in p && p.error)) {

        p.error = {
            code: p.error,
            message: p.error_message || p.error_description
        };

        // Let the state handler handle it
        authCallback(p, window, parent);
    }

    // Trigger a callback to authenticate
    function authCallback(obj, window, parent) {

        // Trigger the callback on the parent
        _this.store(obj.network, obj);

        // If this is a page request it has no parent or opener window to handle callbacks
        if (('display' in obj) && obj.display === 'page') {
            return;
        }

        if (parent) {
            // Call the generic listeners
            // Win.hello.emit(network+":auth."+(obj.error?'failed':'login'), obj);

            // TODO: remove from session object
            var cb = obj.callback;
            try {
                delete obj.callback;
            }
            catch (e) {
            }

            // Update store
            _this.store(obj.network, obj);

            // Call the globalEvent function on the parent
            if (cb in parent) {

                // It's safer to pass back a string to the parent,
                // Rather than an object/array (better for IE8)
                var str = JSON.stringify(obj);

                try {
                    parent[cb](str);
                }
                catch (e) {
                    // Error thrown whilst executing parent callback
                }
            }
        }

        closeWindow();
    }

    function closeWindow() {

        // Close this current window
        try {
            window.close();
        }
        catch (e) {
        }

        // IOS bug wont let us close a popup if still loading
        if (window.addEventListener) {
            window.addEventListener('load', function () {
                window.close();
            });
        }
    }
}

handleSlackResponseHandler.call(hello.utils, window, window.opener || window.parent);
