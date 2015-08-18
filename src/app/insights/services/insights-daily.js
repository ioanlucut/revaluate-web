(function () {
    'use strict';

    function InsightsDailyFactory(InsightsAbstract) {

        /**
         * Insights daily class.
         */
        function InsightsDaily(data) {
            InsightsAbstract.call(this, data);

            this.totalPerDayDTOs = data.totalPerDayDTOs;
        }

        /**
         * Inherit the base class prototype
         */
        InsightsDaily.prototype = Object.create(InsightsAbstract.prototype);

        /**
         * Builds a daily insights from the given data.
         */
        InsightsDaily.build = function (data) {

            return new InsightsDaily(data);
        };

        return InsightsDaily;
    }

    angular
        .module('revaluate.insights')
        .factory('InsightsDaily', InsightsDailyFactory);
}());
