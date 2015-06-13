'use strict';

/**
 * Statistic transformer service which transforms a statistic DTO model object to a statistic business object.
 */
angular
    .module("revaluate.statistics")
    .service("StatisticTransformerService", function ($injector, TransformerUtils) {

        /**
         * Converts a statisticDto object to a statistic business object model.
         * @param statisticDto
         * @param statistic
         * @param skipKeys
         * @returns {*}
         */
        this.toStatistic = function (statisticDto, statistic, skipKeys) {
            statistic = statistic || $injector.get('Statistic').build();

            TransformerUtils.copyKeysFromTo(statisticDto, statistic.model, skipKeys);

            if ( statistic.model.firstExistingExpenseDate ) {
                statistic.model.firstExistingExpenseDate = moment(statistic.model.firstExistingExpenseDate).toDate();
            }

            if ( statistic.model.lastExistingExpenseDate ) {
                statistic.model.lastExistingExpenseDate = moment(statistic.model.lastExistingExpenseDate).toDate();
            }

            return statistic;
        };
    });
