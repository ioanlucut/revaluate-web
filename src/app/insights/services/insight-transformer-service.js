'use strict';

/**
 * Insights transformer service which transforms a insights DTO model object to a insights business object.
 */
angular
    .module("revaluate.insights")
    .service("InsightTransformerService", function ($filter, $injector, TransformerUtils) {

        /**
         * Converts a insightDto object to a insights business object model.
         */
        this.toInsight = function (insightDto, insightsMonthly, skipKeys) {
            insightsMonthly = insightsMonthly || $injector.get('Insights').build();

            TransformerUtils.copyKeysFromTo(insightDto, insightsMonthly.model, skipKeys);

            // handle date conversion
            if ( insightsMonthly.model.from ) {
                insightsMonthly.model.from = moment(insightsMonthly.model.from).toDate();
            }

            if ( insightsMonthly.model.to ) {
                insightsMonthly.model.to = moment(insightsMonthly.model.to).toDate();
            }

            return insightsMonthly;
        };

        this.toInsightOverview = function (insightDto, insightOverview, skipKeys) {
            insightOverview = insightOverview || $injector.get('InsightOverview').build();
            TransformerUtils.copyKeysFromTo(insightDto, insightOverview.model, skipKeys);

            insightOverview.model.insightData = _.map(insightOverview.model.insightsOverview, function (insightOverviewEntry) {
                return insightOverviewEntry.totalAmount;
            });

            insightOverview.model.insightLabels = _.map(insightOverview.model.insightsOverview, function (insightOverviewEntry) {

                return $filter('friendlyMonthDate')(insightOverviewEntry.yearMonth);
            });

            return insightOverview;
        };

        this.toInsightsProgress = function (insightDto, insightsProgress, skipKeys) {
            insightsProgress = insightsProgress || $injector.get('InsightsProgress').build();
            TransformerUtils.copyKeysFromTo(insightDto, insightsProgress.model, skipKeys);

            return insightsProgress;
        };

        this.formatDate = function (givenDate) {
            return moment(givenDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        }
    });
