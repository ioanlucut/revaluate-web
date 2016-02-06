'use strict';

export default angular
    .module('revaluate.common')
    .filter('friendlyHourTimePicker', function () {
        return function (date) {

            return moment(date).format('hh:mm A');
        };
    })
    .name;
