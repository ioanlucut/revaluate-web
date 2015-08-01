(function () {
    'use strict';

    /**
     * InsightsMonthly transformer service which transforms a insights DTO model object to a insights business object.
     */
    angular
        .module('revaluate.insights')
        .service('InsightsTransformerService', function ($filter, $injector, TransformerUtils) {

            /**
             * Converts a insightDto object to a insights business object model.
             */
            this.toInsight = function (insightDto, insightsMonthly, skipKeys) {
                insightsMonthly = insightsMonthly || $injector.get('InsightsMonthly').build();

                TransformerUtils.copyKeysFromTo(insightDto, insightsMonthly.model, skipKeys);

                // handle date conversion
                if (insightsMonthly.model.from) {
                    insightsMonthly.model.from = moment(insightsMonthly.model.from).toDate();
                }

                if (insightsMonthly.model.to) {
                    insightsMonthly.model.to = moment(insightsMonthly.model.to).toDate();
                }

                return insightsMonthly;
            };

            this.toInsightOverview = function (insightDto, insightsOverview, skipKeys) {
                insightsOverview = insightsOverview || $injector.get('InsightsOverview').build();
                TransformerUtils.copyKeysFromTo(insightDto, insightsOverview.model, skipKeys);

                return insightsOverview;
            };

            this.toInsightsProgress = function (insightDto, insightsProgress, skipKeys) {
                insightsProgress = insightsProgress || $injector.get('InsightsProgress').build();
                TransformerUtils.copyKeysFromTo(insightDto, insightsProgress.model, skipKeys);

                return insightsProgress;
            };
        });
}());
