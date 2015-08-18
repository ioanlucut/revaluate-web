(function () {
    'use strict';

    function InsightsMonthlyFactory(InsightsAbstract) {

        /**
         * Insights monthly class.
         */
        function InsightsMonthly(data) {
            InsightsAbstract.call(this, data);

            this.biggestExpense = data.biggestExpense;
            this.categoryWithTheMostTransactionsInsightsDTO = data.categoryWithTheMostTransactionsInsightsDTO;
            this.highestAmountCategory = data.highestAmountCategory;
            this.totalPerCategoryInsightsDTOs = data.totalPerCategoryInsightsDTOs;
        }

        /**
         * Inherit the base class prototype
         */
        InsightsMonthly.prototype = Object.create(InsightsAbstract.prototype);

        InsightsMonthly.prototype.isEmpty = function () {
            return this.totalPerCategoryInsightsDTOs.length === 0;
        };

        InsightsMonthly.prototype.isTransactionsEmpty = function () {
            return this.numberOfTransactions === 0;
        };

        InsightsMonthly.prototype.isManyTransactions = function () {
            return this.numberOfTransactions > 5;
        };

        return InsightsMonthly;
    }

    angular
        .module('revaluate.insights')
        .factory('InsightsMonthly', InsightsMonthlyFactory);
}());
