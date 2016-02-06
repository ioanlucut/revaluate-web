'use strict';

export default angular
    .module('revaluate.categories')
    .service('CategoryTransformerService', function (Category) {

        // ---
        // Name should be always upper case.
        // ---

        this.categoryApiRequestTransformer = function (requestData) {

            function buildCategoryPayload(data) {
                return _.merge(data, { name: data.name.toUpperCase() });
            }

            if ( _.isArray(requestData) ) {
                return _.map(requestData, buildCategoryPayload);
            } else {
                return buildCategoryPayload(requestData);
            }
        };

        this.categoryApiResponseTransformer = function (responseData) {
            function buildCategory(data) {
                return new Category(_.extend(data, {
                    name: data.name.toUpperCase()
                }));
            }

            if ( _.isArray(responseData.data) ) {
                return _.map(responseData.data, buildCategory);
            } else {
                return buildCategory(responseData.data);
            }
        };
    })
    .name;
