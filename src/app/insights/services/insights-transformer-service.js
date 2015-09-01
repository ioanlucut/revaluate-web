(function () {
    'use strict';

    /**
     * InsightsMonthly transformer service which transforms a insights DTO model object to a insights business object.
     */
    angular
        .module('revaluate.insights')
        .service('InsightsTransformerService', function ($filter, $injector, InsightsMonthly, InsightsDaily, InsightsProgress, InsightsOverview) {

            this.insightsMonthlyApiResponseTransformer = function (responseData) {
                return InsightsMonthly
                    .build(_.extend(responseData.data, {
                        from: moment(responseData.data.from).toDate(),
                        to: moment(responseData.data.from).toDate()
                    }));
            };

            this.insightsOverviewApiResponseTransformer = function (responseData) {
                return InsightsOverview
                    .build(responseData.data);
            };

            this.insightsProgressApiResponseTransformer = function (responseData) {
                return InsightsProgress
                    .build(responseData.data);
            };

            this.insightDailyApiResponseTransformer = function (responseData) {
                return InsightsDaily
                    .build(responseData.data);
            };

        });
}());
