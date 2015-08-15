(function () {
    'use strict';

    function InsightsAbstractFactory() {

        /**
         * Insights abstract class.
         */
        function InsightsAbstract(data) {
            this.from = data.from;
            this.to = data.to;
            this.totalAmountSpent = data.totalAmountSpent;
            this.numberOfTransactions = data.numberOfTransactions;
        }

        return InsightsAbstract;
    }

    angular
        .module('revaluate.insights')
        .factory('InsightsAbstract', InsightsAbstractFactory);
}());
