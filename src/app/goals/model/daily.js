(function () {
    'use strict';

    function DailyFactory() {

        /**
         * Daily expenses class.
         */
        function Daily(data) {

            this.from = data.from;
            this.to = data.to;
            this.totalAmountSpent = data.totalAmountSpent;
            this.totalPerDayDTOs = data.totalPerDayDTOs;
        }

        return Daily;
    }

    angular
        .module('revaluate.goals')
        .factory('Daily', DailyFactory);
}());
