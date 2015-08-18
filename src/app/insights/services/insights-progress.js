(function () {
    'use strict';

    function InsightsProgressFactory(InsightsAbstract) {

        /**
         * Insights daily class.
         */
        function InsightsProgress(data) {
            InsightsAbstract.call(this, data);

            this.insightsMonthlyDTO = data.insightsMonthlyDTO;
        }

        /**
         * Inherit the base class prototype
         */
        InsightsProgress.prototype = Object.create(InsightsAbstract.prototype);

        return InsightsProgress;
    }

    angular
        .module('revaluate.insights')
        .factory('InsightsProgress', InsightsProgressFactory);
}());
