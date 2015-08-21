(function () {
    'use strict';

    /**
     * InsightsMonthly transformer service which transforms a insights DTO model object to a insights business object.
     */
    angular
        .module('revaluate.insights')
        .service('InsightsTransformerService', function ($filter, $injector, InsightsMonthly, InsightsDaily, InsightsProgress, InsightsOverview) {

            this.insightsMonthlyApiResponseTransformer = function (responseData) {
                return new InsightsMonthly(_.extend(responseData.data, {
                    from: moment(responseData.data.from).toDate(),
                    to: moment(responseData.data.from).toDate()
                }));
            };

            this.insightsOverviewApiResponseTransformer = function (responseData) {
                return new InsightsOverview(responseData.data);
            };

            this.insightsProgressApiResponseTransformer = function (responseData) {
                return new InsightsProgress(responseData.data);
            };

            this.insightDailyApiResponseTransformer = function (responseData) {
                return new InsightsDaily(responseData.data);
            };

        });
}());
