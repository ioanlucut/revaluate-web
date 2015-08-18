(function () {
    'use strict';

    function InsightsOverviewFactory(InsightsAbstract) {

        /**
         * Insights Overview class.
         */
        function InsightsOverview(data) {
            InsightsAbstract.call(this, data);

            this.insightsOverview = data.insightsOverview;
        }

        /**
         * Inherit the base class prototype
         */
        InsightsOverview.prototype = Object.create(InsightsAbstract.prototype);

        return InsightsOverview;
    }

    angular
        .module('revaluate.insights')
        .factory('InsightsOverview', InsightsOverviewFactory);
}());
