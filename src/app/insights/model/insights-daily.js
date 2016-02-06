'use strict';

function InsightsDailyFactory(InsightsAbstract) {

    /**
     * Daily expenses factory function.
     */
    function insightsDaily(data) {

        return _.extend(InsightsAbstract.build(data), {
            totalPerDayDTOs: data.totalPerDayDTOs
        });
    }

    return {
        build: insightsDaily
    };
}

export default angular
    .module('revaluate.insights')
    .factory('InsightsDaily', InsightsDailyFactory)
    .name;
