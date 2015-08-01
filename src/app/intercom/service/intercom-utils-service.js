(function () {
    'use strict';

    angular
        .module('revaluate.intercom')
        .service('IntercomUtilsService', function ($intercom, AuthService, $rootScope) {

            this.bootIntercom = function (user) {

                // ---
                // Bootstrap intercom.
                // ---
                $intercom.boot(this.getIntercomUser(user));
            };

            this.updateIntercom = function (user) {

                // ---
                // Update intercom.
                // ---
                $intercom.update(this.getIntercomUser(user));
            };

            this.trackEvent = function (eventName) {
                if (AuthService.isAuthenticated()) {

                    $intercom.trackEvent(eventName, {
                        email: $rootScope.currentUser.model.email,
                        created_at: moment().unix(),
                        user_id: '' + $rootScope.currentUser.model.id
                    });
                }            else {
                    $intercom.trackEvent(eventName, {
                        created_at: moment().unix()
                    });
                }
            };

            this.getIntercomUser = function (user) {
                return {
                    email: user.model.email,
                    name: user.model.firstName + ' ' + user.model.lastName,
                    created_at: moment(user.model.createdDate).unix(),
                    user_id: '' + user.model.id
                };
            };
        });
}());
