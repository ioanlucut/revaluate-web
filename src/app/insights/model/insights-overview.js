'use strict';

function InsightsOverviewFactory(InsightsAbstract) {

    /**
     * Overview factory function.
     */
    function insightsOverview(data) {

        return _.extend(InsightsAbstract.build(data), {
            insightsOverview: data.insightsOverview
        });
    }

    return {
        build: insightsOverview
    };
}

export default angular
    .module('revaluate.insights')
    .factory('InsightsOverview', InsightsOverviewFactory)
    .name;
