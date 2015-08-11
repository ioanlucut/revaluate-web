(function () {
    'use strict';

    angular
        .module('revaluate.intercom')
        .service('IntercomUtilsService', function ($intercom, AuthService, $rootScope) {

            this.bootIntercom = function (user, featured) {

                // ---
                // Bootstrap intercom.
                // ---
                $intercom.boot(featured
                    ? _.extend(this.getIntercomUser(user), { featured: featured })
                    : this.getIntercomUser(user));
            };

            this.updateIntercom = function (user, args) {

                // ---
                // Update intercom.
                // ---
                $intercom.update(_.extend(this.getIntercomUser(user), args || {}));
            };

            this.trackEvent = function (eventName) {
                if (AuthService.isAuthenticated()) {

                    $intercom.trackEvent(eventName, {
                        email: $rootScope.currentUser.model.email,
                        created_at: moment().unix(),
                        user_id: '' + $rootScope.currentUser.model.id
                    });
                } else {
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
