'use strict';

/**
 * Insight transformer service which transforms a insight DTO model object to a insight business object.
 */
angular
    .module("revaluate.insights")
    .service("InsightTransformerService", function ($injector, TransformerUtils) {

        /**
         * Converts a insightDto object to a insight business object model.
         */
        this.toInsight = function (insightDto, insight, skipKeys) {
            insight = insight || $injector.get('Insight').build();

            TransformerUtils.copyKeysFromTo(insightDto, insight.model, skipKeys);

            // handle date conversion
            if ( insight.model.from ) {
                insight.model.from = moment(insight.model.from).toDate();
            }

            if ( insight.model.to ) {
                insight.model.to = moment(insight.model.to).toDate();
            }

            insight.model.insightData = _.map(insight.model.totalPerCategoryInsightDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.totalAmount;
            });
            insight.model.insightColors = _.map(insight.model.totalPerCategoryInsightDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.categoryDTO.color.color;
            });
            insight.model.insightLabels = _.map(insight.model.totalPerCategoryInsightDTOs, function (totalPerCategoryInsightDTO) {
                return totalPerCategoryInsightDTO.categoryDTO.name;
            });

            return insight;
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
