(function () {
    'use strict';

    function IntegrationFactory() {

        /**
         * App integration factory function.
         */
        function appIntegration(data) {

            return _.extend({}, {

                /**
                 * The goal id.
                 */
                id: data.id,

                /**
                 * The appIntegrationType.
                 */
                appIntegrationType: data.appIntegrationType,

                /**
                 * The appIntegrationScopeType
                 */
                appIntegrationScopeType: data.appIntegrationScopeType,

                /**
                 * The slack user id
                 */
                slackUserId: data.slackUserId,

                /**
                 * The slack team id
                 */
                slackTeamId: data.slackTeamId,

                /**
                 * Created date of the goal.
                 */
                createdDate: data.createdDate,

                /**
                 * Created date of the goal.
                 */
                modifiedData: data.modifiedData
            });
        }

        return {
            build: appIntegration
        };
    }

    angular
        .module('revaluate.integrations')
        .factory('Integration', IntegrationFactory);
}());
