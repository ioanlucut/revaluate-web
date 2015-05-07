/**
 * Insight transformer service which transforms a insight DTO model object to a insight business object.
 */
angular
    .module("insights")
    .service("InsightTransformerService", function ($injector, TransformerUtils) {

        /**
         * Converts a insight business object model to a insightDto object.
         * @param insight
         * @param skipKeys
         * @returns {{}}
         */
        this.toInsightDto = function (insight, skipKeys) {
            var insightDto = {};

            TransformerUtils.copyKeysFromTo(insight.model, insightDto, skipKeys);
            if ( insightDto.from ) {
                insightDto.from = moment(insightDto.from).format("YYYY-MM-DDTHH:mm:ss.hhh");
            }
            if ( insightDto.to ) {
                insightDto.to = moment(insightDto.to).format("YYYY-MM-DDTHH:mm:ss.hhh");
            }

            return insightDto;
        };

        /**
         * Converts a insightDto object to a insight business object model.
         * @param insightDto
         * @param insight
         * @param skipKeys
         * @returns {*}
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

            if ( insight.model.firstExistingExpenseDate ) {
                insight.model.firstExistingExpenseDate = moment(insight.model.firstExistingExpenseDate).toDate();
            }

            if ( insight.model.lastExistingExpenseDate ) {
                insight.model.lastExistingExpenseDate = moment(insight.model.lastExistingExpenseDate).toDate();
            }

            return insight;
        };

        /**
         * Transform a list of insights as JSON to a list of insights as business object.
         * @param insightDtos
         * @returns {Array}
         */
        this.toInsights = function (insightDtos) {
            var insights = [];

            _.each(insightDtos, _.bind(function (insightDto) {
                insights.push(this.toInsight(insightDto));
            }, this));

            return insights;
        };

        /**
         * Transform a list of insights as business objects to a list of DTOs.
         * @param insights
         * @returns {Array}
         */
        this.toInsightDTOs = function (insights) {
            var insightDTOs = [];

            _.each(insights, _.bind(function (insight) {
                insightDTOs.push(this.toInsightDto(insight));
            }, this));

            return insightDTOs;
        };
    });
