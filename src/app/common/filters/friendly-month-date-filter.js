'use strict';

/* Friendly date filter */

angular
    .module("revaluate.common")
    .filter('friendlyMonthDate', function () {
        return function (date) {

            if ( !_.isDate(date) ) {
                date = moment(date);
            }

            var dateToFormat = moment(date);
            var isSameYear = moment(moment().year()).isSame(dateToFormat.year());

            return dateToFormat.format(isSameYear ? 'MMMM' : 'MMMM YYYY');
        };
    });
