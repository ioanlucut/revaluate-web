/* Account modal */

angular
    .module("account")
    .service("AccountModal", function ($rootScope, $timeout, AUTH_EVENTS) {

        // By default the modal is closed
        this.isOpen = false;

        // Open the modal
        this.open = function () {
            $timeout(_.bind(function () {
                this.isOpen = true;
            }, this));
        };

        // Close the modal
        this.close = function () {
            $timeout(_.bind(function () {
                this.isOpen = false;
            }, this));
        };

        this.state = null;

        // Set state
        this.setState = function (state) {
            $timeout(_.bind(function () {
                this.state = state;
            }, this));
        };

        // Open with state
        this.openWithState = function (state) {
            this.setState(state);
            this.open();
        };

        // Listen to the login event
        $rootScope.$on(AUTH_EVENTS.loginSuccess, _.bind(function () {
            this.close();
        }, this));
    });
