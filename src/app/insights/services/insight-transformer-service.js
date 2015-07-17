'use strict';

/**
 * Insights transformer service which transforms a insights DTO model object to a insights business object.
 */
angular
    .module("revaluate.insights")
    .service("InsightTransformerService", function ($injector, TransformerUtils) {

        /**
         * Converts a insightDto object to a insights business object model.
         */
        this.toInsight = function (insightDto, insights, skipKeys) {
            insights = insights || $injector.get('Insights').build();

            TransformerUtils.copyKeysFromTo(insightDto, insights.model, skipKeys);

            // handle date conversion
            if ( insights.model.from ) {
                insights.model.from = moment(insights.model.from).toDate();
            }

            if ( insights.model.to ) {
                insights.model.to = moment(insights.model.to).toDate();
            }

            insights.model.insightData = _.map(insights.model.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.totalAmount;
            });
            insights.model.insightColors = _.map(insights.model.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.categoryDTO.color.color;
            });
            insights.model.insightLabels = _.map(insights.model.totalPerCategoryInsightsDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.categoryDTO.name;
            });

            return insights;
        };

        this.toInsightOverview = function (insightDto, insightOverview, skipKeys) {
            insightOverview = insightOverview || $injector.get('InsightOverview').build();
            TransformerUtils.copyKeysFromTo(insightDto, insightOverview.model, skipKeys);

            insightOverview.model.insightsOverview = insightOverview.model.insightsOverview.sort(function (a, b) {
                return new Date(a.monthYearFormattedDate) - new Date(b.monthYearFormattedDate);
            });

            insightOverview.model.insightData = _.map(insightOverview.model.insightsOverview, function (insightOverviewEntry) {
                return insightOverviewEntry.totalAmount;
            });

            insightOverview.model.insightLabels = _.map(insightOverview.model.insightsOverview, function (insightOverviewEntry) {
                var dateToFormat = moment(new Date(insightOverviewEntry.monthYearFormattedDate));
                var isSameYear = moment(moment().year()).isSame(dateToFormat.year());

                return dateToFormat.format(isSameYear ? 'MMMM' : 'MMMM YYYY');
            });

            return insightOverview;
        };

        this.formatDate = function (givenDate) {
            return moment(givenDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        }
    });
