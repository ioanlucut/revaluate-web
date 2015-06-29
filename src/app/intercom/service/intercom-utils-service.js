'use strict';

angular
    .module("revaluate.intercom")
    .service("IntercomUtilsService", function ($intercom) {

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

        this.getIntercomUser = function (user) {
            return {
                email: user.model.email,
                name: user.model.firstName + ' ' + user.model.lastName,
                created_at: moment(user.model.createdDate).unix(),
                user_id: '\'' + user.model.id + '\''
            };
        };
    });
