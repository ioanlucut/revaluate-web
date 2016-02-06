'use strict';

export default angular
    .module('revaluate.integrations')
    .service('IntegrationsTransformerService', function (Integration) {

        this.integrationApiResponseTransformer = function (responseData) {
            function buildIntegration(data) {
                return Integration.build(_.extend(data, {
                    modifiedDate: toDate(data.modifiedDate),
                    createdDate: toDate(data.createdDate)
                }));
            }

            function toDate(candidate) {
                return moment(candidate).toDate();
            }

            if ( _.isArray(responseData.data) ) {
                return _.map(responseData.data, buildIntegration);
            } else {
                return buildIntegration(responseData.data);
            }
        };
    })
    .name;
