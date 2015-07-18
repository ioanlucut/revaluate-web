'use strict';

/**
 * Dates utils service.
 */
angular
    .module("revaluate.common")
    .service("DatesUtils", function () {

        this.fromLastMonthsToNow = function (intervalMonths) {
            var from = moment().subtract(intervalMonths - 1, "M").startOf('month');
            var to = moment().add(1, 'month').startOf('month');

            return {
                from: from,
                to: to
            }
        };

    });
