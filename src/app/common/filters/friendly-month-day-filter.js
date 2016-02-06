'use strict';

export default angular
    .module('revaluate.common')
    .filter('friendlyMonthDay', function () {
        return function (date) {

            if (!_.isDate(date)) {
                date = moment(new Date(date));
            }

            return moment(date).format('D');
        };
    })
    .name;
